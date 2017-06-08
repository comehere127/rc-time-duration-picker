## TimeDurationPicker

npm: 3.10.10

yarn: v0.21.3

nodejs: v6.10.0

## INSTALL
npm install rc-time-duration-picker

yarn add rc-time-duration-picker

## USAGE
import TimeDurationPicker from 'rc-time-duration-picker';

ReactDOM.render(< TimeDurationPicker />, container);

Only select time 24h: 
< TimeDurationPicker defaultValue={moment()}/>

Only select time 12h: 
< TimeDurationPicker defaultValue={moment()} use12Hours />

Select time of week day: 
< TimeDurationPicker defaultValue={moment()} showWeekDay/>

Select time of month day: 
< TimeDurationPicker defaultValue={moment()} showMonthDay />

Select time of month, month day: 
< TimeDurationPicker defaultValue={moment()} showMonth showMonthDay />

Using locale, supporting for Vietnamese and English: default English
< TimeDurationPicker defaultValue={moment()} showMonth showMonthDay locale={'vi'} />



## DEMO
yarn start

http://localhost:3000/examples/demo.html

## AUTHOR
TuDHM-VNG
