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
      <div className='col-sm-3 change-player-container'>
        <span
          className={'change-player-btn' + classStr}
          onClick={this.handleClick}
        >
          <i className='material-icons'>search</i>
          <span className='change-player-btn-txt'>SEARCH</span>
        </span>
      </div>
    );
  }
}
