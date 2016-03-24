import React from 'react';

import SelectPlayerName from './SelectPlayerName';

export default class TeamContainer extends React.Component{
  render() {
    const PlayerNames = this.props.players.map(function(player, i) {
      return (
        <SelectPlayerName
          key={i}
          name={player.name}
          playerClick={this.props.playerClick} />
      );
    }.bind(this));

    return (
      <div className='col-sm-3 team-container'>
        <div className='row team-name'>{this.props.team}</div>
        {PlayerNames}
      </div>
    );
  }
}
