import React from 'react';

import ClickRect from './ClickRect';
import TooltipInstructions from '../TooltipInstructions';

export default class ClickGrid extends React.Component {
  constructor(props) {
    super(props);

    this._tooltipHighlight = this._tooltipHighlight.bind(this);
  }

  _tooltipHighlight(i, j) {
    switch (this.props.tooltipState) {
      case 0:
        return i === 12 && j === 5;
      case 1:
      case 2:
        return i === 17 && j === 2;
      default:
        return false;
    }
  }

  render() {
    const _rectWidth = this.props.width / 23;
    const _rectHeight = this.props.height / 12;
    const _array = [];
    for (var i = 0; i < 23; i++) {
      for (var j = 0; j < 12; j++) {
        _array.push({
          x: i,
          y: j,
          selected: this.props.selectedGrids.indexOf('(' + i + ', ' + j + ')') !== -1,
          highlight: this._tooltipHighlight(i, j)
        });
      }
    }
    const ClickRects = _array.map(function(obj, i) {
      return (
        <ClickRect
          key={i}
          width={_rectWidth}
          height={_rectHeight}
          x={obj.x}
          y={obj.y}
          onClick={this.props.clickHandler}
          selected={obj.selected}
          tooltipHighlight={obj.highlight} />
      );
    }.bind(this));

    return (
      <div className='court-interactives'>
        <svg
          className='court-grid'
          width={this.props.width}
          height={this.props.height} >
          {ClickRects}
        </svg>
        <TooltipInstructions
          tooltipState={this.props.tooltipState}
          rectWidth={_rectWidth}
          rectHeight={_rectHeight} />
      </div>
    );
  }
}