import React from 'react';

export default class PositionToggle extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.pressed ? this.props.onFilter(-1) : this.props.onFilter(this.props.position);
  }
  
  render() {
    const classStr = 'btn btn-default position-tgl-btn' + (this.props.pressed ? ' active' : '');
    return (
      <button
        type='button'
        className={classStr}
        onClick={this.handleClick} >
        {this.props.name}
      </button>
    );
  }
}
