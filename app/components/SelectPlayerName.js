import React from 'react';

export default class TeamContainer extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.playerClick(this.props.name);
  }

  render() {
    return (
      <div className='row player-name' onClick={this.handleClick} >
        {this.props.name}
      </div>
    );
  }
}
