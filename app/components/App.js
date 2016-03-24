import React from 'react';

import Nav from './Nav';
import PlayerContainer from './PlayerContainer';
import LoadOverlay from './LoadOverlay';

export default class App extends React.Component{
  render() {
    return (
      <div>
        <Nav />
        <PlayerContainer />
        <LoadOverlay />
      </div>
    );
  }
}
