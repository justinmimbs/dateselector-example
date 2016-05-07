import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { range } from '../utilities/number-utilities';

const propTypes = {
  first: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

class YearList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).querySelector('li.selected').scrollIntoView(false);
  }

  handleClick(e) {
    if (!e.target.hasAttribute('data-year')) {
      return;
    }

    const year = Number(e.target.getAttribute('data-year'));
    if (year !== this.props.selected) {
      this.props.onChange(year);
    }
  }

  render() {
    const props = this.props;
    return (
      <ol onClick={this.handleClick}>
        {range(props.first, props.last + 1).map(year =>
          <li key={year} data-year={year} className={year === props.selected ? 'selected' : ''}>
            {year}
          </li>
        )}
      </ol>
    );
  }
}

YearList.propTypes = propTypes;

export default YearList;
