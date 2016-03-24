import React from 'react';
import ReactDOM from 'react-dom';

import HistogramD3 from './HistogramD3';

export default class HistogramContainer extends React.Component{
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  componentDidMount() {
    var node = ReactDOM.findDOMNode(this);
    var width = node.parentNode.offsetWidth;
    this._histogram = new HistogramD3(node,
      width,
      110,
      this.props.histogramData
    );
  }

  componentDidUpdate() {
    if (this.props.data) this._histogram.update(this.props.data);
  }

  componentWillUnmount() {
    this._histogram.remove();
  }

  render() {
    return (
      <svg className='histogram' />
    );
  }
}
