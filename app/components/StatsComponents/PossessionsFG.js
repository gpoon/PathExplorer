import React from 'react';

import LoadSpinner from '../LoadComponents/LoadSpinner';

export default class PossessionsFG extends React.Component{
  render() {
    var content = (function() {
      if (this.props.percent !== null) {
        return this.props.percent !== 'NaN%' ? this.props.percent : '0%';
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
          FG Made for Team
        </div>
      </div>
    )
  }
}
