import React from 'react';

import Histogram from './Histogram';

export default class HistogramContainer extends React.Component{
  render() {
    const width = this.props.width * 0.55;
    const height = width * 0.22;
    return (
      <div className='col-sm-8 histogram-container'>
        <Histogram
          width={width}
          height={height}
          data={this.props.data} />
      </div>
    );
  }
}
