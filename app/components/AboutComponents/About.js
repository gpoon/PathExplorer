import React from 'react';

export default class About extends React.Component{
  constructor(props) {
    super(props);

    this.returnTop = this.returnTop.bind(this);
  }

  returnTop() {
    $('html, body').animate({
      scrollTop: $( $('.nav') ).offset().top
    }, 500);
  }

  render() {
    return (
      <div className='about-section'>
        <div className='about-header'>ABOUT</div>
        <div className='about-body'>
          <div className='about-subheader'>
            WHAT IS THIS?
          </div>
          <p>
            This is an interactive visualization of SportVU data collected from the first half of the 2015-2016 NBA season through <a href="http://stats.nba.com" target="_blank">stats.nba.com</a>. SportVU is a motion-tracking system that locates players' and the basketball's positions on the court during games. For this visualization, the positions of one player/basketball from all the games they participated in during the first half of the season are gathered and plotted on a basketball court.
          </p>
          <div className='about-subheader'>
            WHAT DOES THIS SHOW?
          </div>
          <p>
            The lines on the basketball court represent where one particular player/baskeball moved on every possessions from the first half of the season. Each line represents a player's position during a single possession he participated in. Offensive possessions are shown by default, but you can change what possessions are shown by interacting with the offense-defense toggle button, the court and search; specifics are covered in the next section.
          </p>
          <p>
            There are a number of stats shown below the court.
          </p>
          <p>
            You can see how many possessions (lines) are shown from the left-most number. Next to that, the percentage of (shown) possessions that resulted in a field goal regardless of who made it. Finally, a histogram of when the possessions happened during games, which can be a proxy for seeing when a player got his minutes during games.
          </p>
          <div className='about-subheader'>
            WHAT CAN I INTERACT WITH?
          </div>
          <p>
            There are three things: the court, the offense-defense toggle button and the search.
          </p>
          <div className='about-subsubheader'>
            The Court
          </div>
          <p>
            Hover your mouse over the court to reveal squares highlighted in white. If you click on a square, then the paths will be updated and only possessions where the player moved through the square will be shown. You can add more squares by HOLDING SHIFT and clicking on more squares. With multiple squares selected, only paths that go through ALL the squares will be shown.
          </p>
          <p>
            To remove a square, hold shift and click on the square you want to remove.
          </p>
          <div className='about-subsubheader'>
            Offense-Defense Toggle Button
          </div>
          <p>
            Only possessions on offense are shown by default. Click the button above and to the right of the court to toggle between offense & defense. Notice that the red hoop indicates where the team on offense is trying to score. This means that your selected player is attacking the basket on the right and defending the basket on the left.
          </p>
          <div className='about-subsubheader'>
            Search
          </div>
          <p>
            Search for other players by clicking on the magnifying glass above and to the left of the court. Type in the name of a player or team - to get the positions of their basketball. You can also filter players by position using the buttons to the right of the text input, or scroll through the list of players.
          </p>
          <div className='about-subheader'>
            WHO MADE THIS?
          </div>
          <p>
            Gabriel Poon. I am interested in Data Visualization, Machine Learning and Sports Analysis.
          </p>
          <p>
            Contact me at gabrielhmpoon@gmail dot com or on <a href="https://www.linkedin.com/in/gabriel-poon-72a2a8a2" target="_blank">LinkedIn</a>.
          </p>
          <div className='about-subheader help'>
            I DON'T SEE ANY LINES ON THE COURT.
          </div>
          <p>
            Are you using Internet Explorer? Try a different browser like Chrome or Firefox.
          </p>
        </div>
        <div className='about-footer'>
          <button
            type='button'
            className='btn btn-default about-close-btn'
            onClick={this.returnTop} >
            RETURN TO VISUALIZATION
          </button>
        </div>
      </div>
    );
  }
}
