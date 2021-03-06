import React from 'react';

import LoadSpinner from '../LoadComponents/LoadSpinner';
import Canvas from './Canvas';
import ClickGrid from './ClickGrid';
import CourtBackground from './CourtBackground';

export default class CourtContainer extends React.Component{
  render() {
    var CourtSpinner = (function() {
      if (this.props.canvasData === null) {
        var loadingContents = [];

        loadingContents.push(
          <div
            key={1}
            className='court-load-overlay'
            style={{width: this.props.width, height: this.props.height, position: 'absolute'}} />
        );

        loadingContents.push(
          <LoadSpinner
            key={2}
            position='absolute'
            width={this.props.width / 4}
            height={this.props.height / 4} />
        );

        return loadingContents
      } else {
        return false;
      }
    }.bind(this))();

    return (
      <div className='col-sm-12 court-container'>
        <Canvas
          canvasData={this.props.canvasData}
          incrementIntro={this.props.incrementIntro}
          tooltipState={this.props.tooltipState}
          width={this.props.width}
          height={this.props.height} />
        {CourtSpinner}
        <ClickGrid
          clickHandler={this.props.gridClick}
          selectedGrids={this.props.selectedGrids}
          width={this.props.width}
          height={this.props.height}
          hasData={this.props.canvasData && this.props.canvasData.length > 1}
          tooltipState={this.props.tooltipState} />
        <CourtBackground
          onOffense={this.props.onOffense}
          width={this.props.width}
          height={this.props.height} />
      </div>
    );
  }
}