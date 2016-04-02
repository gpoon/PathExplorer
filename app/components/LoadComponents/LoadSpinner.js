import React from 'react';

export default class LoadSpinner extends React.Component{
  render() {
    const styleDict = {
      width: this.props.width,
      height: this.props.height,
      position: (this.props.position || 'relative')
    };

    return (
      <svg 
        className="loader-spiral"
        viewBox="25 25 50 50"
        style={styleDict} >
        <circle
          className="loader-path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10" />
      </svg>
    );
  }
}
