import React from 'react';

import ModalDialog from './ModalDialog';

export default class ModalOverlay extends React.Component{
  constructor(props) {
    super(props);
    this.state = {visibility: 'visible'};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({visibility: 'hidden'});
  }
  
  render() {
    return (
      <div
        className='modal-overlay'
        style={{visibility: this.state.visibility}}
        onClick={this.handleClick} >
        <ModalDialog btnClick={this.handleClick} />
      </div>
    );
  }
}
