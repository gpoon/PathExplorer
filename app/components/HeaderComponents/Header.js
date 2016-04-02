import React from 'react';

import ChangePlayerBtn from './ChangePlayerBtn';
import TitlePlayerName from './TitlePlayerName';
import OffDefToggle from './OffDefToggle';

export default class Header extends React.Component{
  render() {
    return (
      <div className="row header">
        <ChangePlayerBtn
          selectNewPlayer={this.props.selectNewPlayer}
          showPlayerSelect={this.props.showPlayerChange} />
        <TitlePlayerName
          selectNewPlayer={this.props.selectNewPlayer}
          player={this.props.player} />
        <OffDefToggle
          selectNewPlayer={this.props.selectNewPlayer}
          offDef={this.props.offDef}
          toggleOffDef={this.props.toggleOffDef} />
      </div>
    );
  }
}
