import React from 'react';

import ModalDialog from './ModalDialog';

export default class ModalOverlay extends React.Component{
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('modal increment')
    this.props.incrementIntro();
  }
  
  render() {
    const hide = (function() {
      switch (this.props.tooltipState) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 8:
        case 9:
          return 'visible';
        default:
          return 'hidden';
      }
    }.bind(this))();

    return (
      <div
        className='modal-overlay'
        style={{visibility: hide}}
        onClick={this.handleClick} >
        <ModalDialog
          tooltipState={this.props.tooltipState}
          btnClick={this.handleClick} />
      </div>
    );
  }
}
