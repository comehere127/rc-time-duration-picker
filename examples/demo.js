import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import TimeDuationPicker from 'rc-time-duration-picker';

class App extends React.Component {
  handleChange = (value) => {
    console.log(value);
  }
  render() {
    return (
      <div>
        <TimeDuationPicker defaultValue={moment()} onChange={this.handleChange} />
        <TimeDuationPicker defaultValue={moment()} showWeekDay onChange={this.handleChange} />
        <TimeDuationPicker defaultValue={moment()} showMonthDay onChange={this.handleChange} />
        <TimeDuationPicker defaultValue={moment()} showMonth showMonthDay onChange={this.handleChange} />
      </div>
    );
  }
}
ReactDom.render(
  <App />,
  document.getElementById('__react-content')
);