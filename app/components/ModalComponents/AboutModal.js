import React from 'react';

import AboutModalDialog from './AboutModalDialog';

export default class AboutModal extends React.Component{
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.closeAbout();
  }
  
  render() {
    return (
      <div
        className='modal-overlay'
        onClick={this.handleClick} >
        <AboutModalDialog btnClick={this.handleClick} />
      </div>
    );
  }
}
