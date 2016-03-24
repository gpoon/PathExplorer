import React from 'react';

import PositionToggle from './PositionToggle';

export default class PositionToggleGroup extends React.Component{
  render() {
    const positions = [[0,'GUARDS'],[1,'FORWARDS'],[2,'CENTERS'],[3,'BASKETBALLS']];
    const Toggles = positions.map(function(d) {
      return (
        <PositionToggle
          key={d[0]}
          position={d[0]}
          name={d[1]}
          pressed={d[0]===this.props.filteredPosition}
          onFilter={this.props.toggleFilter} />
        );
    }.bind(this));

    return (
      <div className='btn-group position-tgl-group' role='group'>
        {Toggles}
      </div>
    );
  }
}
