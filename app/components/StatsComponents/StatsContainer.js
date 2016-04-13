import React from 'react';

import PossessionsCount from './PossessionsCount';
import PossessionsFG from './PossessionsFG';
import HistogramContainer from './HistogramContainer';

export default class StatsContainer extends React.Component{
  render() {
    var classStr = this.props.selectNewPlayer ? ' selecting-player' : '';
    return (
      <div className={'row stats-container' + classStr}>
        <PossessionsCount count={this.props.tooltipState > 1 ? this.props.numPossessions : null} />
        <PossessionsFG percent={this.props.tooltipState > 1 ? this.props.fGPercent : null} />
        <HistogramContainer
          width={this.props.width}
          data={this.props.tooltipState > 1 ? this.props.histogramData : null} />
      </div>
    )
  }
}
