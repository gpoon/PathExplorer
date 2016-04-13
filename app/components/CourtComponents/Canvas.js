import React from 'react';
import ReactDOM from 'react-dom';
import d3_queue from 'd3-queue';

import CanvasHTML5 from './CanvasHTML5';

export default class Canvas extends React.Component{
  constructor() {
    super();

    this._new = true;
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidMount() {
    this._canvas = new CanvasHTML5(
      ReactDOM.findDOMNode(this),
      this.props.width,
      this.props.height,
      this.props.canvasData
    );
  }

  componentDidUpdate() {
    if (this.props.canvasData && this.props.tooltipState > 0) {
      if (!this._new || this.props.tooltipState > 7) {
        this._canvas.update(this.props.canvasData);
      } else {
        this._canvas.drawFirst(this.props.canvasData, this.props.showTooltip);
        this._new = false;
      }
    }
  }
  
  render() {
    return (
      <canvas className='court-canvas' />
    );
  }
}