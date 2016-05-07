import React, { PropTypes } from 'react';
import { isBetween, range } from '../utilities/number-utilities';
import { cx } from '../utilities/react-utilities';

// (Number, [a]) -> [[a]]
function chunk(n, array) {
  return range(0, Math.ceil(array.length / n))
    .map(i => array.slice(i * n, i * n + n));
}

// (Date, Date) -> Boolean
function dateEquals(a, b) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

// Function -> Function
function memoizeLast(f) {
  // cached arguments and result
  let a = null;
  let r = null;
  return (...b) => {
     // shallow compare argument arrays (a, b)
    if (!(a && a.length === b.length && a.every((x, i) => x === b[i]))) {
      a = b;
      r = f(...a);
    }

    return r;
  };
}

/**
 * (Number, Number) -> [Date]
 *
 * returns an array of 42 Dates, containing all the dates in the given month, from the Monday
 * previous through the next 6 weeks
 */
function _monthDates(year, month) {
  const first = new Date(year, month, 1);
  const weekday = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - weekday);
  const [y, m, d] = [start.getFullYear(), start.getMonth(), start.getDate()];
  return range(0, 42).map(i => new Date(y, m, d + i));
}

const monthDates = memoizeLast(_monthDates);

const propTypes = {
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  selected: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

class DateTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (!e.target.hasAttribute('data-index')) {
      return;
    }

    const props = this.props;
    const index = e.target.getAttribute('data-index');
    const date = monthDates(props.selected.getFullYear(), props.selected.getMonth())[index];
    if (!dateEquals(date, props.selected) && isBetween(props.min, props.max, date)) {
      props.onChange(date);
    }
  }

  render() {
    const props = this.props;
    const year = props.selected.getFullYear();
    const month = props.selected.getMonth();
    const selectedUnixTime = new Date(year, month, props.selected.getDate()).getTime();
    const weeks = chunk(7, monthDates(year, month));
    return (
      <table>
        <thead>
          <tr>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
            <th>Su</th>
          </tr>
        </thead>
        <tbody onClick={this.handleClick}>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((date, j) => (
                <td
                  key={j}
                  className={cx({
                    selected: date.getTime() === selectedUnixTime,
                    dimmed: date.getMonth() !== month,
                    disabled: !isBetween(props.min, props.max, date),
                  })}
                  data-index={i * 7 + j}
                >
                  {date.getDate()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

DateTable.propTypes = propTypes;

export default DateTable;
