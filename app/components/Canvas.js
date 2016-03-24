import React from 'react';
import ReactDOM from 'react-dom';

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
    if (this.props.canvasData) {
      var pause = this._new ? 350 : 0;
      setTimeout(function() {
          this._canvas.update(this.props.canvasData)
        }.bind(this), pause);
      this._new = false;
    } else {
      this._new = true;
    }
  }
  
  render() {
    return (
      <canvas className='court-canvas' />
    );
  }
}