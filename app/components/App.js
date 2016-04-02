import React from 'react';

import Nav from './Nav';
import PlayerContainer from './PlayerContainer';
import AboutModal from './ModalComponents/AboutModal';
import SmallPage from './SmallPageComponents/SmallPage';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {showAbout: false};

    this.toggleAbout = this.toggleAbout.bind(this);
  }

  toggleAbout() {
    this.setState({showAbout: !this.state.showAbout});
  }

  render() {
     if (window.innerWidth > 100) {
      const aboutModal = (function() {
        if (this.state.showAbout) {
          return (<AboutModal closeAbout={this.toggleAbout} />);
        } else {
          return false
        }
      }.bind(this))();

      return (
        <div>
          <Nav showAbout={this.toggleAbout} />
          <PlayerContainer />
          {aboutModal}
        </div>
      );
    } else {
      return (
        <div>
          <SmallPage />
        </div>
      );
    }
  }
}
