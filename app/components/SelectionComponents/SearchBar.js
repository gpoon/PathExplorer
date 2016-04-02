import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.props.onChange(e.target.value);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).focus();
  }

  render() {
    return (
      <input
        style={{width: this.props.width, display: 'inline'}}
        className='search-bar'
        type='text'
        placeholder='Type Player or Team Name'
        onChange={this.onChange} />
    );
  }
}
