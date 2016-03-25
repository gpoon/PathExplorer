import React from 'react';

export default class ChangePlayerBtn extends React.Component{
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.showPlayerSelect();
  }
  
  render() {
    const classStr = this.props.selectNewPlayer ? ' selecting-player' : '';
    return (
      <div className='col-lg-3 change-player-container'>
        <img
          className={'change-player-btn' + classStr}
          src='/imgs/change-player.svg'
          onClick={this.handleClick} />
      </div>
    );
  }
}
