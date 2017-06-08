import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import 'rc-time-duration-picker/index.less';
import TimeDurationPicker from 'rc-time-duration-picker';

class App extends React.Component {
  handleChange = (value) => {
    console.log(value);
  }
  render() {
    return (
      <div>
        <p> <b>Only select time 24h </b> <TimeDurationPicker defaultValue={moment()} onChange={this.handleChange} /></p>
        <p> <b>Only select time 12h </b> <TimeDurationPicker defaultValue={moment()} onChange={this.handleChange} use12Hours /></p>
        <p> <b>Select time of week day </b> <TimeDurationPicker defaultValue={moment()} showWeekDay onChange={this.handleChange} /></p>
        <p> <b>Select time of month day </b> <TimeDurationPicker defaultValue={moment()} showMonthDay onChange={this.handleChange} /></p>
        <p> <b>Select time of month, month day </b> <TimeDurationPicker defaultValue={moment()} showMonth showMonthDay onChange={this.handleChange} /></p>
        <p> <b>Using locale, supporting for Vietnamese and English </b> <TimeDurationPicker defaultValue={moment()} showMonth showMonthDay onChange={this.handleChange} locale={'vi'} /></p>
      </div>
    );
  }
}
ReactDom.render(
  <App />,
  document.getElementById('__react-content')
);