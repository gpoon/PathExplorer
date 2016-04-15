import React from 'react';

import ClickRect from './ClickRect';
import TooltipInstructions from '../TooltipInstructions';

export default class ClickGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showTooltip: true};
    this.prev_state = 0;

    this._tooltipHighlight = this._tooltipHighlight.bind(this);
    this.rectClicked = this.rectClicked.bind(this);
  }

  _tooltipHighlight(i, j) {
    switch (this.props.tooltipState) {
      case 3:
        return i === 12 && j === 5 && this.state.showTooltip;
      case 5:
      case 7:
        return i === 17 && j === 2 && this.state.showTooltip;
      default:
        return false;
    }
  }

  rectClicked(x, y, shiftDown) {
    this.props.clickHandler(x, y, shiftDown);
    switch (this.props.tooltipState) {
      case 3:
        this.setState({showTooltip: false});
        break;
      case 5:
      case 7:
        if (shiftDown && x === 17 && y === 2) {
          this.setState({showTooltip: false});
        }
        break;
      default:
        break;
    }
  }

  componentDidUpdate() {
    if (this.props.tooltipState < 10 && this.prev_state !== this.props.tooltipState) {
      this.setState({showTooltip: true});
      this.prev_state = this.props.tooltipState;
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
          onClick={this.rectClicked}
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
          showTooltip={this.state.showTooltip}
          rectWidth={_rectWidth}
          rectHeight={_rectHeight} />
      </div>
    );
  }
}
