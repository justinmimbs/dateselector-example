require('./DateSelectorDropdownButton.css');

import React, { PropTypes } from 'react';
import { cx } from '../utilities/react-utilities';

// Number -> String
function pad(n) {
  return (n < 10 ? '0' : '') + n;
}

// Date -> String
function stringFromDate(date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(pad).join('-');
}

const propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  isOpen: PropTypes.bool.isRequired,
};

function DateSelectorDropdownButton(props) {
  return (
    <div className={cx({ 'date-selector-dropdown-button': true, open: props.isOpen })}>
      <div className="date">{stringFromDate(props.date)}</div>
      <div className="arrow">
        <span>{props.isOpen ? '\u25B2' : '\u25BC'}</span>
      </div>
    </div>
  );
}

DateSelectorDropdownButton.propTypes = propTypes;

export default DateSelectorDropdownButton;
