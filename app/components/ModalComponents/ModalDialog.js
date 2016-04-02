import React from 'react';

export default class ModalDialog extends React.Component{
  constructor(props) {
    super(props);
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleDialogClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleBtnClick() {
    this.props.btnClick();
  }

  render() {
    return (
      <div className='modal-dialog-custom' onClick={this.handleDialogClick} >
        <div className='dialog-header'>
          PATH EXPLORER
        </div>
        <div className='dialog-body'>
          <p>SEE how NBA players move on the basketball court.</p>
          <p>DISCOVER tendencies by comparing possessions.</p>
          <p>INTERACT with the data to gain new insight.</p>
        </div>
        <div className='dialog-footer'>
          <button
            type='button'
            className='btn btn-default dialog-close-btn'
            onClick={this.handleBtnClick} >
            EXPLORE PLAYER PATHS
          </button>
        </div>
      </div>
    );
  }
}
