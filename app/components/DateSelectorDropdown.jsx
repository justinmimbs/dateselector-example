require('./DateSelectorDropdown.css');

import React, { PropTypes } from 'react';
import DateSelector from './DateSelector';

const propTypes = {
  ButtonComponent: PropTypes.func.isRequired,
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  selected: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

class DateSelectorDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleButtonClick() {
    if (this.state.isOpen) {
      this.handleOutsideClick();
      return;
    }
    this.setState({ isOpen: true });
    document.addEventListener('click', this.handleOutsideClick);
  }

  handleDropdownClick(e) {
    e.nativeEvent.stopImmediatePropagation();
  }

  handleOutsideClick() {
    this.setState({ isOpen: false });
    document.removeEventListener('click', this.handleOutsideClick);
  }

  render() {
    const props = this.props;
    return (
      <div className="date-selector-dropdown" onClick={this.handleDropdownClick}>
        <div className="button-container" onClick={this.handleButtonClick}>
          <props.ButtonComponent
            date={props.selected}
            isOpen={this.state.isOpen}
          />
        </div>
        {
          this.state.isOpen
            ? (
                <DateSelector
                  min={props.min}
                  max={props.max}
                  selected={props.selected}
                  onChange={props.onChange}
                />
              )
            : null
        }
      </div>
    );
  }
}

DateSelectorDropdown.propTypes = propTypes;

export default DateSelectorDropdown;
