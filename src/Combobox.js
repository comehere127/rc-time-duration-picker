import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import moment from 'moment';
import { List } from 'immutable';
import { ConvertStringToInt, GetDayOfWeek, GetMonthOfYear, StandalEnglish } from './Constant';

const formatOption = (option, disabledOptions) => {
    let value = `${option}`;
    if (option < 10) {
        value = `0${option}`;
    }

    let disabled = false;
    if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
        disabled = true;
    }

    return {
        value,
        disabled,
    };
};

const formatOptionString = (option, disabledOptions) => {
    let disabled = false;
    if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
        disabled = true;
    }

    return {
        value: option,
        disabled,
    };
};

class Combobox extends React.Component {
    static propTypes = {
        format: PropTypes.string,
        defaultOpenValue: PropTypes.object,
        prefixCls: PropTypes.string,
        value: PropTypes.object,
        onChange: PropTypes.func,

        showHour: PropTypes.bool,
        showMinute: PropTypes.bool,
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

        onCurrentSelectPanelChange: PropTypes.func,
        use12Hours: PropTypes.bool,
        locale: PropTypes.string,
    };

    onItemChange = (type, itemValue) => {
        const { onChange, defaultOpenValue, use12Hours, locale } = this.props;
        const value = (this.props.value || defaultOpenValue).clone();
        if (type === 'hour') {
            if (use12Hours) {
                if (this.isAM()) {
                    value.hour(+itemValue % 12);
                } else {
                    value.hour((+itemValue % 12) + 12);
                }
            } else {
                value.hour(+itemValue);
            }
        } else if (type === 'minute') {
            value.minute(+itemValue);
        } else if (type === 'ampm') {
            const ampm = itemValue.toUpperCase();
            if (use12Hours) {
                if (ampm === 'PM' && value.hour() < 12) {
                    value.hour((value.hour() % 12) + 12);
                }

                if (ampm === 'AM') {
                    if (value.hour() >= 12) {
                        value.hour(value.hour() - 12);
                    }
                }
            }
        } else if (type === 'weekday') {
            value.day(GetDayOfWeek(locale).findIndex(x => x === itemValue));
        } else if (type === 'monthday') {
            value.date(ConvertStringToInt(itemValue));
        } else if (type === 'month') {
            value.month(GetMonthOfYear(locale).findIndex(x => x === itemValue));
        }
        onChange(value);
    }

    onEnterSelectPanel = (range) => {
        this.props.onCurrentSelectPanelChange(range);
    }

    getHourSelect(hour) {
        const { prefixCls, hourOptions, disabledHours, showHour, use12Hours } = this.props;
        if (!showHour) {
            return null;
        }
        const disabledOptions = disabledHours();
        let hourOptionsAdj;
        let hourAdj;
        if (use12Hours) {
            hourOptionsAdj = [12].concat(hourOptions.filter(h => h < 12 && h > 0));
            hourAdj = (hour % 12) || 12;
        } else {
            hourOptionsAdj = hourOptions;
            hourAdj = hour;
        }

        return (
            <Select
                prefixCls={prefixCls}
                options={hourOptionsAdj.map(option => formatOption(option, disabledOptions))}
                selectedIndex={hourOptionsAdj.indexOf(hourAdj)}
                type="hour"
                onSelect={this.onItemChange}
                onMouseEnter={this.onEnterSelectPanel.bind(this, 'hour')}
            />
        );
    }

    getMinuteSelect(minute) {
        const { prefixCls, minuteOptions, disabledMinutes, defaultOpenValue, showMinute } = this.props;
        if (!showMinute) {
            return null;
        }
        const value = this.props.value || defaultOpenValue;
        const disabledOptions = disabledMinutes(value.hour());

        return (
            <Select
                prefixCls={prefixCls}
                options={minuteOptions.map(option => formatOption(option, disabledOptions))}
                selectedIndex={minuteOptions.indexOf(minute)}
                type="minute"
                onSelect={this.onItemChange}
                onMouseEnter={this.onEnterSelectPanel.bind(this, 'minute')}
            />
        );
    }

    getWeekDaysSelect(weekday) {
        const { prefixCls, weekDayOptions, disabledWeekDays, defaultOpenValue, showWeekDay } = this.props;
        if (!showWeekDay) {
            return null;
        }
        const value = this.props.value || defaultOpenValue;
        const disabledOptions = disabledWeekDays(value.weekday());

        return (
            <Select
                prefixCls={`${prefixCls}-day`}
                options={weekDayOptions.map(option => formatOptionString(option, disabledOptions))}
                selectedIndex={weekday.toString() >> 0}
                type="weekday"
                onSelect={this.onItemChange}
                onMouseEnter={this.onEnterSelectPanel.bind(this, 'weekday')}
            />
        );
    }

    getMonthDaysSelect(monthday) {
        const { prefixCls, monthDayOptions, disabledMonthDays, defaultOpenValue, showMonthDay } = this.props;
        if (!showMonthDay) {
            return null;
        }
        const value = this.props.value || defaultOpenValue;
        const disabledOptions = disabledMonthDays(value.date());

        return (
            <Select
                prefixCls={`${prefixCls}-day`}
                options={monthDayOptions.map(option => formatOptionString(option, disabledOptions))}
                selectedIndex={monthday.toString() >> 0}
                type="monthday"
                onSelect={this.onItemChange}
                onMouseEnter={this.onEnterSelectPanel.bind(this, 'monthday')}
            />
        );
    }

    getMonthsSelect(month) {
        const { prefixCls, monthOptions, disabledMonths, defaultOpenValue, showMonth } = this.props;
        if (!showMonth) {
            return null;
        }
        const value = this.props.value || defaultOpenValue;
        const disabledOptions = disabledMonths(value.date());

        return (
            <Select
                prefixCls={`${prefixCls}-month`}
                options={monthOptions.map(option => formatOptionString(option, disabledOptions))}
                selectedIndex={month.toString() >> 0}
                type="month"
                onSelect={this.onItemChange}
                onMouseEnter={this.onEnterSelectPanel.bind(this, 'month')}
            />
        );
    }

    getAMPMSelect() {
        const { prefixCls, use12Hours, format } = this.props;
        if (!use12Hours) {
            return null;
        }

        const AMPMOptions = ['am', 'pm'] // If format has A char, then we should uppercase AM/PM
            .map(c => format.match(/\sA/) ? c.toUpperCase() : c)
            .map(c => ({ value: c }));

        const selected = this.isAM() ? 0 : 1;

        return (
            <Select
                prefixCls={prefixCls}
                options={AMPMOptions}
                selectedIndex={selected}
                type="ampm"
                onSelect={this.onItemChange}
                onMouseEnter={this.onEnterSelectPanel.bind(this, 'ampm')}
            />
        );
    }

    isAM() {
        const value = (this.props.value || this.props.defaultOpenValue);
        return value.hour() >= 0 && value.hour() < 12;
    }

    render() {
        const { prefixCls, defaultOpenValue } = this.props;
        const value = this.props.value || defaultOpenValue;
        return (
            <div className={`${prefixCls}-combobox`}>
                {this.getMonthsSelect(value.month())}
                {this.getMonthDaysSelect(value.date())}
                {this.getWeekDaysSelect(value.weekday())}
                {this.getHourSelect(value.hour())}
                {this.getMinuteSelect(value.minute())}
                {this.getAMPMSelect(value.hour())}
            </div>
        );
    }
}

export default Combobox;
