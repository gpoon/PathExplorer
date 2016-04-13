import React from 'react';

import Nav from './Nav';
import PlayerContainer from './PlayerContainer';
import About from './AboutComponents/About';

export default class App extends React.Component{
  render() {
    return (
      <div>
        <Nav />
        <PlayerContainer />
        <About />
      </div>
    );
  }
}
