require('./main.css');

import React from 'react';
import ReactDOM from 'react-dom';
import DateSelectorDropdown from './components/DateSelectorDropdown';
import DateSelectorDropdownButton from './components/DateSelectorDropdownButton';

class ExampleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minDate: new Date(2010, 3, 1),
      maxDate: new Date(2019, 8, 30),
      selectedDate: new Date(2016, 0, 8),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedDate) {
    this.setState({ selectedDate });
  }

  render() {
    return (
      <DateSelectorDropdown
        ButtonComponent={DateSelectorDropdownButton}
        min={this.state.minDate}
        max={this.state.maxDate}
        selected={this.state.selectedDate}
        onChange={this.handleChange}
      />
    );
  }
}

function init() {
  ReactDOM.render(<ExampleForm />, document.querySelector('#output'));
}

window.addEventListener('DOMContentLoaded', init);
