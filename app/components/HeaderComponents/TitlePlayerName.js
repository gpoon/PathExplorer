import React from 'react';

export default class TitlePlayerName extends React.Component{
  render() {
    const classStr = this.props.selectNewPlayer ? ' selecting-player' : '';
    return (
      <div
        className={'col-sm-6 player-title' + classStr}>
        <h1>
          {this.props.player.toUpperCase()}
        </h1>
      </div>
    )
  }
}
