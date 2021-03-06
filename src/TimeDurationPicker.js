import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import Panel from './Panel';
import placements from './placements';
import moment from 'moment';
import { GetDayOfWeek, GetMonthOfYear, GetPrefixDay } from './Constant';

function noop() {
}

function refFn(field, component) {
    this[field] = component;
}

export default class Picker extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        clearText: PropTypes.string,
        value: PropTypes.object,
        defaultOpenValue: PropTypes.object,
        disabled: PropTypes.bool,
        allowEmpty: PropTypes.bool,
        defaultValue: PropTypes.object,
        open: PropTypes.bool,
        defaultOpen: PropTypes.bool,
        align: PropTypes.object,
        placement: PropTypes.any,
        transitionName: PropTypes.string,
        getPopupContainer: PropTypes.func,
        placeholder: PropTypes.string,
        format: PropTypes.string,

        showHour: PropTypes.bool,
        showMinute: PropTypes.bool,
        showWeekDay: PropTypes.bool,
        showMonthDay: PropTypes.bool,
        showMonth: PropTypes.bool,

        style: PropTypes.object,
        className: PropTypes.string,
        popupClassName: PropTypes.string,

        disabledHours: PropTypes.func,
        disabledMinutes: PropTypes.func,
        disabledWeekDays: PropTypes.func,
        disabledMonthDays: PropTypes.func,
        disabledMonths: PropTypes.func,

        hideDisabledOptions: PropTypes.bool,
        onChange: PropTypes.func,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        addon: PropTypes.func,
        name: PropTypes.string,
        autoComplete: PropTypes.string,
        use12Hours: PropTypes.bool,
        locale: PropTypes.string,
    };

    static defaultProps = {
        clearText: 'clear',
        prefixCls: 'rc-time-duration-picker',
        defaultOpen: false,
        style: {},
        className: '',
        popupClassName: '',
        align: {},
        defaultOpenValue: moment(),
        allowEmpty: true,

        showHour: true,
        showMinute: true,
        showWeekDay: false,
        showMonthDay: false,
        showMonth: false,

        disabledHours: noop,
        disabledMinutes: noop,
        disabledWeekDays: noop,
        disabledMonthDays: noop,
        disabledMonths: noop,

        hideDisabledOptions: false,
        placement: 'bottomLeft',
        onChange: noop,
        onOpen: noop,
        onClose: noop,
        addon: noop,
        use12Hours: false,
        locale: 'en',
    };

    constructor(props) {
        super(props);
        this.saveInputRef = refFn.bind(this, 'picker');
        this.savePanelRef = refFn.bind(this, 'panelInstance');
        const { defaultOpen, defaultValue, open = defaultOpen, value = defaultValue } = props;
        this.state = {
            open,
            value,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { value, open } = nextProps;
        if ('value' in nextProps) {
            this.setState({
                value,
            });
        }
        if (open !== undefined) {
            this.setState({ open });
        }
    }

    onPanelChange = (value) => {
        this.setValue(value);
    }

    onPanelClear = () => {
        this.setValue(null);
        this.setOpen(false);
    }

    onVisibleChange = (open) => {
        this.setOpen(open);
    }

    onEsc = () => {
        this.setOpen(false);
        this.focus();
    }

    onKeyDown = (e) => {
        if (e.keyCode === 40) {
            this.setOpen(true);
        }
    }

    setValue(value) {
        if (!('value' in this.props)) {
            this.setState({
                value,
            });
        }
        this.props.onChange(value);
    }

    getFormat() {
        const { format, showHour, showMinute, use12Hours } = this.props;
        if (format) {
            return format;
        }

        if (use12Hours) {
            const fmtString = ([
                showHour ? 'h' : '',
                showMinute ? 'mm' : '',
            ].filter(item => !!item).join(':'));

            return fmtString.concat(' a');
        }

        return [
            showHour ? 'HH' : '',
            showMinute ? 'mm' : '',
        ].filter(item => !!item).join(':');
    }

    getPanelElement() {
        const {
      prefixCls, placeholder, disabledHours, disabledWeekDays, disabledMonthDays, disabledMonths, disabledMinutes,
            hideDisabledOptions, allowEmpty,
            showHour, showMinute, showWeekDay, showMonthDay, showMonth,
            defaultOpenValue, clearText, addon, use12Hours, locale,
    } = this.props;
        return (
            <Panel
                clearText={clearText}
                prefixCls={`${prefixCls}-panel`}
                ref={this.savePanelRef}
                value={this.state.value}
                onChange={this.onPanelChange}
                onClear={this.onPanelClear}
                defaultOpenValue={defaultOpenValue}

                showHour={showHour}
                showMinute={showMinute}
                showWeekDay={showWeekDay}
                showMonthDay={showMonthDay}
                showMonth={showMonth}

                onEsc={this.onEsc}
                allowEmpty={allowEmpty}
                format={this.getFormat()}
                placeholder={placeholder}

                disabledHours={disabledHours}
                disabledMinutes={disabledMinutes}
                disabledWeekDays={disabledWeekDays}
                disabledMonthDays={disabledMonthDays}
                disabledMonths={disabledMonths}

                hideDisabledOptions={hideDisabledOptions}
                use12Hours={use12Hours}
                addon={addon}
                locale={locale}
            />
        );
    }

    getPopupClassName() {
        const { showHour, showMinute, use12Hours, showWeekDay, showMonthDay, showMonth, prefixCls } = this.props;
        let popupClassName = this.props.popupClassName;
        // Keep it for old compatibility
        if ((!showHour || !showMinute) && !use12Hours && (!showWeekDay || !showMonthDay || !showMonth)) {
            popupClassName += ` ${prefixCls}-panel-narrow`;
        }
        let selectColumnCount = 0;
        if (showWeekDay || showMonthDay || showMonth) {
            selectColumnCount += 1;
        }
        if (showHour) {
            selectColumnCount += 1;
        }
        if (showMinute) {
            selectColumnCount += 1;
        }
        if (use12Hours) {
            selectColumnCount += 1;
        }
        popupClassName += ` ${prefixCls}-panel-column-${selectColumnCount}`;
        return popupClassName;
    }

    setOpen(open) {
        const { onOpen, onClose } = this.props;
        if (this.state.open !== open) {
            if (!('open' in this.props)) {
                this.setState({ open });
            }
            if (open) {
                onOpen({ open });
            } else {
                onClose({ open });
            }
        }
    }

    focus() {
        this.picker.focus();
    }
    handleShowMonthDay = (data, format) => {
        let dataR = '';
        if (data) {
            if (this.props.showMonth) {
                dataR += GetMonthOfYear(this.props.locale).get(data.month()) + ', ';
            }
            if (this.props.showMonthDay) {
                dataR += GetPrefixDay(this.props.locale, data.date()) + ', ';
            }
            if (this.props.showWeekDay) {
                dataR += GetDayOfWeek(this.props.locale).get(data.weekday()) + ', ';
            }
            dataR += data.format(format);
        }
        return dataR;
    }
    render() {
        const {
      prefixCls, placeholder, placement, align,
            disabled, transitionName, style, className, getPopupContainer, name, autoComplete,
    } = this.props;
        const { open, value } = this.state;
        const popupClassName = this.getPopupClassName();
        return (
            <Trigger
                prefixCls={`${prefixCls}-panel`}
                popupClassName={popupClassName}
                popup={this.getPanelElement()}
                popupAlign={align}
                builtinPlacements={placements}
                popupPlacement={placement}
                action={disabled ? [] : ['click']}
                destroyPopupOnHide
                getPopupContainer={getPopupContainer}
                popupTransitionName={transitionName}
                popupVisible={open}
                onPopupVisibleChange={this.onVisibleChange}
            >
                <span className={`${prefixCls} ${className}`} style={style}>
                    <input
                        className={`${prefixCls}-input`}
                        ref={this.saveInputRef}
                        type="text"
                        placeholder={"placeholder"}
                        name={name}
                        readOnly
                        onKeyDown={this.onKeyDown}
                        disabled={disabled}
                        value={this.handleShowMonthDay(value, this.getFormat())}
                        autoComplete={autoComplete}
                    />
                    <span className={`${prefixCls}-icon`} />
                </span>
            </Trigger>
        );
    }
}
