import React from 'react';

import TeamContainer from './TeamContainer';

export default class SelectionContainer extends React.Component{
  render() {
    var data = (function() {
      if (this.props.players) {
        var dict = {};
        if (this.props.players.length > 50) {
          this.props.teams.forEach(function(team) {
            dict[team.name] = []
          })
        }

        this.props.players.forEach(function(player) {
          if (dict[player.team] !== undefined) {
            dict[player.team].push(player);
          } else {
            dict[player.team] = [player];
          }
        });
        return dict;
      } else {
        return false;
      }
    }.bind(this))();

    var teamContainers = (function() {
      if (data) {
        var teamNames = Object.keys(data);
        var containerItems = [];
        for (var i = 0; i < teamNames.length; i++) {
          var team = teamNames[i];
          containerItems.push(
            <TeamContainer
                key={team}
                team={team}
                players={data[team]}
                playerClick={this.props.playerClick} />
          );

          if ((i + 1) % 4 == 0) {
            containerItems.push(<div key={i} className='clearfix' />);
          }
        }

        return containerItems;
      } else {
        return false;
      }
    }.bind(this))();

    return (
      <div className='selection-container-padding'>
        <div
          className='selection-container'
          style={{height: this.props.height - 135}} >
          {teamContainers}
        </div>
      </div>
    );
  }
}
