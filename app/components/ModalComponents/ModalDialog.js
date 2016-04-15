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
    const header = (function() {
      switch (this.props.tooltipState) {
        case 0:
          return (
            <div className='dialog-header'>HOW DO NBA PLAYERS MOVE ON THE COURT?</div>
          );
        case 9:
          return (
            <div className='dialog-header'>OTHER FUNCTIONS</div>
          );
        default:
          return false;
      }
    }.bind(this))();

    const body = (function() {
      switch (this.props.tooltipState) {
        case 0:
          return (
            <div className='dialog-body'>
              <p>This interactive visualization shows NBA players’ movements on the court from the first half of the 2015-16 season.</p>
            </div>
          );
        case 2:
          return (
            <div className='dialog-body'>
              <p>That line was where Steph Curry went during <span className='decima-bold'>one possession</span>.</p>
            </div>
          );
        case 4:
          return (
            <div className='dialog-body'>
              <p>You will now see <span className='decima-bold'>ONLY</span> possessions where the player passed through the selected square.</p>
            </div>
          );
        case 6:
          return (
            <div className='dialog-body'>
              <p>Now only possessions where the player passed through <span className='decima-bold'>BOTH</span> squares will be shown.</p>
            </div>
          );
        case 8:
          return (
            <div className='dialog-body'>
              <p>You are now <span className='decima-bold'>BACK</span> to one square of selection.</p>
            </div>
          );
        case 9:
          return (
            <div className='dialog-body'>
              <p><span className='decima-bold'>SEE</span> stats on these possessions below the court.</p>
              <p><span className='decima-bold'>SEARCH</span> for your favorite player from the magnifying glass on the top left.</p>
            </div>
          );
        default:
          return false;
      }
    }.bind(this))();

    const closeBtnText = (function() {
      switch (this.props.tooltipState) {
        case 0:
          return 'EXPLORE PLAYER PATHS';
        case 9:
          return 'END WALKTHROUGH';
        default:
          return 'CLOSE';
      }
    }.bind(this))();

    return (
      <div className='modal-dialog' onClick={this.handleDialogClick} >
        {header}
        {body}
        <div className='dialog-footer'>
          <button
            type='button'
            className='btn btn-default dialog-close-btn'
            onClick={this.handleBtnClick} >
            {closeBtnText}
          </button>
        </div>
      </div>
    );
  }
}
