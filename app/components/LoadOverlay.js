import React from 'react';

import LoadDialog from './LoadDialog';

export default class LoadOverlay extends React.Component{
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
        className='load-overlay'
        style={{visibility: this.state.visibility}}
        onClick={this.handleClick} >
        <LoadDialog btnClick={this.handleClick} />
      </div>
    );
  }
}
