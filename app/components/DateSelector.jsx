require('./DateSelector.css');

import React, { PropTypes } from 'react';
import YearList from './YearList';
import MonthList from './MonthList';
import DateTable from './DateTable';
import { clamp } from '../utilities/number-utilities';
import { cx } from '../utilities/react-utilities';

// Date -> [Number, Number, Number]
function yearMonthDate(date) {
  return [date.getFullYear(), date.getMonth(), date.getDate()];
}

// Number -> Boolean
function isLeapYear(y) {
  return Boolean(y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0));
}

// (Number, Number) -> Number
function daysInMonth(year, month) {
  return isLeapYear(year) && month === 1
    ? 29
    : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

const propTypes = {
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  selected: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
  }

  handleChangeYear(year) {
    const [y, m, d] = yearMonthDate(this.props.selected);
    const date = isLeapYear(y) && m === 1 && d === 29 && !isLeapYear(year)
      ? new Date(year, 1, 28)
      : new Date(year, m, d);
    this.props.onChange(clamp(this.props.min, this.props.max, date));
  }

  handleChangeMonth(month) {
    const y = this.props.selected.getFullYear();
    const d = this.props.selected.getDate();
    const date = new Date(y, month, Math.min(d, daysInMonth(y, month)));
    this.props.onChange(clamp(this.props.min, this.props.max, date));
  }

  render() {
    const props = this.props;
    const [year, month] = yearMonthDate(props.selected);
    const yearMin = props.min.getFullYear();
    const yearMax = props.max.getFullYear();

    return (
      <div
        className={cx({
          'date-selector': true,
          'scrollable-year': (yearMax - yearMin) + 1 > 12,
        })}
      >
        <div className="column year">
          <YearList
            first={yearMin}
            last={yearMax}
            selected={year}
            onChange={this.handleChangeYear}
          />
        </div>
        <div className="column month">
          <MonthList
            first={year === yearMin ? props.min.getMonth() : 0}
            last={year === yearMax ? props.max.getMonth() : 11}
            selected={month}
            onChange={this.handleChangeMonth}
          />
        </div>
        <div className="column date">
          <DateTable {...props} />
        </div>
      </div>
    );
  }
}

DateSelector.propTypes = propTypes;

export default DateSelector;
