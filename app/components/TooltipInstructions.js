import React from 'react';

export default class TooltipInstructions extends React.Component {
  constructor(props) {
    super(props);

    this._getProperties = this._getProperties.bind(this);
  }

  _getProperties(state) {
    var prop = {};
    switch (state) {
      case 3:
        prop.text = 'CLICK THIS SQUARE';
        prop.x = this.props.rectWidth * 13 + 20;
        prop.y = this.props.rectHeight * 5 - (60 - this.props.rectHeight) / 2;
        prop.opacity = this.props.showTooltip ? 1 : 0;
        break;
      case 5:
        prop.text = 'HOLD SHIFT + CLICK';
        prop.x = this.props.rectWidth * 18 + 20;
        prop.y = this.props.rectHeight * 2 - (60 - this.props.rectHeight) / 2;
        prop.opacity = this.props.showTooltip ? 1 : 0;
        break;
      case 7:
        prop.text = 'HOLD SHIFT AND CLICK THIS SQUARE AGAIN';
        prop.x = this.props.rectWidth * 18 + 20;
        prop.y = this.props.rectHeight * 2 - (60 - this.props.rectHeight) / 2;
        prop.opacity = this.props.showTooltip ? 1 : 0;
        break;
      default:
        prop.text = '';
        prop.x = 0;
        prop.y = 0;
        prop.opacity = 0;
        break;
    };
    return prop;
  }

  render() {
    const tooltipProps = this._getProperties(this.props.tooltipState);
    const styleDict = {
      'opacity': tooltipProps.opacity,
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