import React from 'react';
import ReactDOM from 'react-dom';

import CanvasHTML5 from './CanvasHTML5';

export default class Canvas extends React.Component{
  constructor(props) {
    super(props);
    this._new = this.props.tooltipState === 0;
    this._block = false;

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.allowUpdate = this.allowUpdate.bind(this);
  }

  componentDidMount() {
    this._canvas = new CanvasHTML5(
      ReactDOM.findDOMNode(this),
      this.props.width,
      this.props.height,
      this.props.canvasData,
      this.allowUpdate
    );
  }

  allowUpdate() {
    this._new = false;
  }

  componentDidUpdate() {
    if (this._new) {
      if (this.props.tooltipState > 0 && !this._block) {
        this._canvas.drawFirst(this.props.canvasData, this.props.incrementIntro);
        this._block = true;
      }
    } else {
      this._canvas.update(this.props.canvasData);
    }
  }

  render() {
    return (
      <canvas className='court-canvas' />
    );
  }
}