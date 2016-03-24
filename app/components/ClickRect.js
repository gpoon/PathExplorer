import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

export default class ClickRect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hovered: false};

    this.componentDidMount = this.componentDidMount.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  componentDidMount() {
    // Using D3 here to detect shift key
    d3.select(ReactDOM.findDOMNode(this))
      .on('click', function(d) {
        this.props.onClick(this.props.x, this.props.y, d3.event.shiftKey);
      }.bind(this));
  }

  mouseOver() {
    this.setState({hovered: true});
  }

  mouseOut() {
    this.setState({hovered: false});
  }

  render() {
    const selected = this.props.selected ? ' selected' : '';
    const hovered = this.state.hovered ? ' hovered' : '';
    const highlight = this.props.tooltipHighlight ? ' tooltip-highlight' : '';

    return (
      <rect
        className={'trav-box' + selected + hovered + highlight}
        width={this.props.width}
        height={this.props.height}
        x={this.props.x * this.props.width}
        y={this.props.y * this.props.height}
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut} />
    );
  }
}