import React from 'react';

import LoadSpinner from '../LoadComponents/LoadSpinner';

export default class PossessionsCount extends React.Component{
  render() {
    var content = (function() {
      if (this.props.count !== null) {
        return d3.format(',')(this.props.count);
      } else {
        return (
          <LoadSpinner
            width='20px'
            height='20px' />
        )
      }
    }.bind(this))();

    return (
      <div className="col-sm-2 stats-group">
        <div className='stats-num'>
          {content}
        </div>
        <div className='stats-txt'>
          Possessions
        </div>
      </div>
    )
  }
}
