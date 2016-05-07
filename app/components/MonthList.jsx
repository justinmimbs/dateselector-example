import React, { PropTypes } from 'react';
import { isBetween } from '../utilities/number-utilities';
import { cx } from '../utilities/react-utilities';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const propTypes = {
  first: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

class MonthList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (!e.target.hasAttribute('data-month')) {
      return;
    }

    const props = this.props;
    const month = Number(e.target.getAttribute('data-month'));
    if (month !== props.selected && isBetween(props.first, props.last, month)) {
      props.onChange(month);
    }
  }

  render() {
    const props = this.props;
    return (
      <ol onClick={this.handleClick}>
        {monthNames.map((monthName, month) =>
          <li
            key={month}
            data-month={month}
            className={cx({
              selected: month === props.selected,
              disabled: !isBetween(props.first, props.last, month),
            })}
          >
            {monthName}
          </li>
        )}
      </ol>
    );
  }
}

MonthList.propTypes = propTypes;

export default MonthList;
