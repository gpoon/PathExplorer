import React from 'react';

export default class AboutModalDialog extends React.Component{
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
        <div className='about-dialog-body'>
          <div className='dialog-subheader'>
            What is this?
          </div>
          <p>
            This is an interactive visualization of SportVU data collected from the first half of the 2015-2016 NBA season through <a href="http://stats.nba.com" onClick={function(){window.open('http://stats.nba.com')}}>stats.nba.com</a>. SportVU tracks where players and the basketball are located on the court during games. For each possession a player (or the ball) participated in, a white line is drawn on the court to represent his movement. You can see how many possessions are drawn from the number on the left below the court. Next to that, you can see the percentage of those possessions that resulted in a field goal (regardless of whether the player attempted it) and a histogram of when the possessions happened during games.
          </p>
          <div className='dialog-subheader'>
            How does this work?
          </div>
          <p>
            Hover your mouse over the court to reveal squares. Click on a square and the visualization will only show possessions where the player moved through the square. Add more squares by holding shift and clicking on more squares. Only possessions that pass through ALL the squares will be shown. To remove a square, hold shift and click.
          </p>
          <p>
            Only possessions on offense are shown by default. Click the button above and to the right of the court to toggle between offense & defense. Notice that the hoop indicates where the team on offense is trying to score.
          </p>
          <p>
            Search for other players by clicking on the magnifying glass above and to the left of the court. Type in the name of a player or team, filter players by position using the buttons, or scroll through the list of players.
          </p>
          <div className='dialog-subheader'>
            Who made this?
          </div>
          <p>
            Gabriel Poon. Contact me at daskinesis at gmail.com.
          </p>
        </div>
        <div className='about-dialog-footer'>
          <button
            type='button'
            className='btn btn-default dialog-close-btn'
            onClick={this.handleBtnClick} >
            CLOSE
          </button>
        </div>
      </div>
    );
  }
}
