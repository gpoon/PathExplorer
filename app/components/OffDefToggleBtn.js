import React from 'react';

export default class OffDefToggleBtn extends React.Component{
  constructor(props) {
    super(props);
    this.getClassName = this.getClassName.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getClassName() {
    return this.props.selected ? 'offdef-tgl-btn tgl-selected' : 'offdef-tgl-btn';
  }

  handleClick(e) {
    e.preventDefault();
    this.props.toggleOffDef();
  }
  
  render() {
    return (
      <span
        className={this.getClassName()}
        onClick={this.handleClick} >
        {this.props.children}
      </span>
    );
  }
}
