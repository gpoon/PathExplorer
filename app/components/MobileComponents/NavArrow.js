import React from 'react';
import $ from 'jquery';

export default class NavArrow extends React.Component{
  constructor(props) {
    super(props);

    this.goToAnchor = this.goToAnchor.bind(this);
  }

  goToAnchor() {
    $('html, body').animate({
      scrollTop: $( $('#' + this.props.destination) ).offset().top
    }, 800);
  }

  render() {
    const classNames = this.props.top ? 'material-icons top-arrow' : 'material-icons btm-arrow';
    return (
      <i
        className={classNames}
        onClick={this.goToAnchor}>
        {this.props.symbol}
      </i>
    )
  }
}
