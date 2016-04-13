import React from 'react';

import ModalDialog from './ModalDialog';

export default class ModalOverlay extends React.Component{
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.incrementTooltipState();
  }
  
  render() {
    const hide = [0, 3, 5, 7].indexOf(this.props.tooltipState) > -1 ? 'visible' : 'hidden';

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
