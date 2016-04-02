import React from 'react';

import OffDefToggleBtn from './OffDefToggleBtn';

export default class OffDefToggle extends React.Component{
  render() {
    var classStr = this.props.selectNewPlayer ? ' selecting-player' : '';
    return (
      <div className={'col-sm-3 offdef-tgl-group' + classStr}>
        <OffDefToggleBtn
          selected={this.props.offDef == 'Off'}
          toggleOffDef={this.props.toggleOffDef} >
          OFFENSE
        </OffDefToggleBtn>
        <OffDefToggleBtn
          selected={this.props.offDef == 'Def'}
          toggleOffDef={this.props.toggleOffDef} >
          DEFENSE
        </OffDefToggleBtn>
      </div>
    );
  }
}
