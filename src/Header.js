import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { GetDayOfWeek, GetMonthOfYear, GetPrefixDay } from './Constant';

class Header extends React.Component {
    static propTypes = {
        format: PropTypes.string,
        prefixCls: PropTypes.string,
        placeholder: PropTypes.string,
        clearText: PropTypes.string,
        value: PropTypes.object,

        showWeekDay: PropTypes.bool,
        showMonthDay: PropTypes.bool,
        showMonth: PropTypes.bool,

        hourOptions: PropTypes.array,
        minuteOptions: PropTypes.array,
        weekDayOptions: PropTypes.array,
        monthDayOptions: PropTypes.array,
        monthOptions: PropTypes.array,

        disabledHours: PropTypes.func,
        disabledMinutes: PropTypes.func,
        disabledWeekDays: PropTypes.func,
        disabledMonthDays: PropTypes.func,
        disabledMonths: PropTypes.func,

        onChange: PropTypes.func,
        onClear: PropTypes.func,
        onEsc: PropTypes.func,
        allowEmpty: PropTypes.bool,
        defaultOpenValue: PropTypes.object,
        currentSelectPanel: PropTypes.string,
    };

    constructor(props) {
        super(props);
        const { value, format } = props;
        this.state = {
            str: this.handleShowMonthDay(value, format),
            invalid: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { value, format } = nextProps;
        this.setState({
            str: this.handleShowMonthDay(value, format),
            invalid: false,
        });
    }
    handleShowMonthDay = (data, format) => {
        let dataR = '';
        if (data) {
            if (this.props.showMonth) {
                dataR += GetMonthOfYear('vi').get(data.month()) + ', ';
            }
            if (this.props.showMonthDay) {
                dataR += GetPrefixDay('vi', data.date()) + ', ';
            }
            if (this.props.showWeekDay) {
                dataR += GetDayOfWeek('vi').get(data.weekday()) + ', ';
            }
            dataR += data.format(format);
        }
        return dataR;
    }
    onInputChange = (event) => {
        const str = event.target.value;
        this.setState({
            str,
        });
        const {
      format, hourOptions, minuteOptions,
            disabledHours, disabledMinutes,
            onChange, allowEmpty,
    } = this.props;

        if (str) {
            const originalValue = this.props.value;
            const value = this.getProtoValue().clone();
            const parsed = moment(str, format, true);
            if (!parsed.isValid()) {
                this.setState({
                    invalid: true,
                });
                return;
            }
            value.hour(parsed.hour()).minute(parsed.minute());

            // if time value not allowed, response warning.
            if (
                hourOptions.indexOf(value.hour()) < 0 ||
                minuteOptions.indexOf(value.minute()) < 0
            ) {
                this.setState({
                    invalid: true,
                });
                return;
            }

            // if time value is disabled, response warning.
            const disabledHourOptions = disabledHours();
            const disabledMinuteOptions = disabledMinutes(value.hour());
            if (
                (disabledHourOptions && disabledHourOptions.indexOf(value.hour()) >= 0) ||
                (disabledMinuteOptions && disabledMinuteOptions.indexOf(value.minute()) >= 0)
            ) {
                this.setState({
                    invalid: true,
                });
                return;
            }

            if (originalValue) {
                if (
                    originalValue.hour() !== value.hour() ||
                    originalValue.minute() !== value.minute()
                ) {
                    // keep other fields for rc-calendar
                    const changedValue = originalValue.clone();
                    changedValue.hour(value.hour());
                    changedValue.minute(value.minute());
                    onChange(changedValue);
                }
            } else if (originalValue !== value) {
                onChange(value);
            }
        } else if (allowEmpty) {
            onChange(null);
        } else {
            this.setState({
                invalid: true,
            });
            return;
        }

        this.setState({
            invalid: false,
        });
    }

    onKeyDown = (e) => {
        if (e.keyCode === 27) {
            this.props.onEsc();
        }
    }

    onClear = () => {
        this.setState({ str: '' });
        this.props.onClear();
    }

    getClearButton() {
        const { prefixCls, allowEmpty } = this.props;
        if (!allowEmpty) {
            return null;
        }
        return (<a
            className={`${prefixCls}-clear-btn`}
            role="button"
            title={this.props.clearText}
            onMouseDown={this.onClear}
        />);
    }

    getProtoValue() {
        return this.props.value || this.props.defaultOpenValue;
    }

    getInput() {
        const { prefixCls, placeholder } = this.props;
        const { invalid, str } = this.state;
        const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
        return (
            <input
                className={`${prefixCls}-input  ${invalidClass}`}
                ref="input"
                onKeyDown={this.onKeyDown}
                value={str}
                placeholder={placeholder}
                onChange={this.onInputChange}
            />
        );
    }

    render() {
        const { prefixCls } = this.props;
        return (
            <div className={`${prefixCls}-input-wrap`}>
                {this.getInput()}
                {this.getClearButton()}
            </div>
        );
    }
}

export default Header;
