import 'rc-time-duration-picker/styles/index.less';
import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import TimeDurationPicker from 'rc-time-duration-picker';

class App extends React.Component {
  handleChange = (value) => {
    console.log(value);
  }
  render() {
    return (
      <div>
        <TimeDurationPicker defaultValue={moment()} onChange={this.handleChange} />
        <TimeDurationPicker defaultValue={moment()} showWeekDay onChange={this.handleChange} />
        <TimeDurationPicker defaultValue={moment()} showMonthDay onChange={this.handleChange} />
        <TimeDurationPicker defaultValue={moment()} showMonth showMonthDay onChange={this.handleChange} />
      </div>
    );
  }
}
ReactDom.render(
  <App />,
  document.getElementById('__react-content')
);