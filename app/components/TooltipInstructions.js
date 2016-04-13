import React from 'react';

export default class TooltipInstructions extends React.Component {
  constructor(props) {
    super(props);

    this._getProperties = this._getProperties.bind(this);
  }

  _getProperties(state) {
    var prop = {};
    switch (state) {
      case 2:
        prop.text = 'CLICK THIS SQUARE';
        prop.x = this.props.rectWidth * 13 + 20;
        prop.y = this.props.rectHeight * 5 - (60 - this.props.rectHeight) / 2;
        break;
      case 4:
        prop.text = 'HOLD SHIFT AND CLICK THIS SQUARE';
        prop.x = this.props.rectWidth * 18 + 20;
        prop.y = this.props.rectHeight * 2 - (60 - this.props.rectHeight) / 2;
        break;
      case 6:
        prop.text = 'HOLD SHIFT AND CLICK THIS SQUARE AGAIN';
        prop.x = this.props.rectWidth * 18 + 20;
        prop.y = this.props.rectHeight * 2 - (60 - this.props.rectHeight) / 2;
        break;
      default:
        prop.text = '';
        prop.x = 0;
        prop.y = 0;
        break;
    };
    return prop;
  }

  render() {
    const tooltipProps = this._getProperties(this.props.tooltipState);
    const styleDict = {
      'opacity': [2, 4, 6].indexOf(this.props.tooltipState) > -1 ? 1 : 0,
      'top': tooltipProps.y,
      'left': tooltipProps.x
    };

    return (
      <div
        className='tooltip-instructions'
        style={styleDict} >
        <div className='tooltip-txt'>
          {tooltipProps.text}
        </div>
      </div>
    );
  }
}