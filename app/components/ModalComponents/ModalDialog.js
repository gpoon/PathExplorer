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
      if (this.props.tooltipState === 0) {
        return (
          <div className='dialog-header'>HOW DO NBA PLAYERS MOVE ON THE COURT?</div>
        );
      } else {
        return false;
      }
    }.bind(this))();

    const body = (function() {
      switch (this.props.tooltipState) {
        case 0:
          return (
            <div className='dialog-body'>
              <p>This visualization shows NBA players’ movements on the court from the 2015-16 season.</p>
              <p>Each line on the court is a player’s positions during <span className='decima-bold'>one possession</span>.</p>
              <p><span className='decima-bold'>SEE</span> how many possessions each player had, how many resulted in a field goal for their team, and when these possessions happened during games.</p>
              <p><span className='decima-bold'>SEARCH</span> for your favorite player.</p>
            </div>
          );
        case 3:
          return (
            <div className='dialog-body'>
              <p>You will now see <span className='decima-bold'>ONLY</span> possessions where the player passed through the selected square.</p>
            </div>
          );
        case 5:
          return (
            <div className='dialog-body'>
              <p>Now only possessions where the player passed through <span className='decima-bold'>BOTH</span> squares will be shown.</p>
            </div>
          );
        case 7:
          return (
            <div className='dialog-body'>
              <p>You are now <span className='decima-bold'>BACK</span> to one square of selection.</p>
            </div>
          );
        default:
          return false;
      }
    }.bind(this))();

    const closeBtnText = this.props.tooltipState === 0 ? 'EXPLORE PLAYER PATHS' : 'CLOSE';

    return (
      <div className='modal-dialog-custom' onClick={this.handleDialogClick} >
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
