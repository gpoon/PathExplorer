import React from 'react';

import Nav from './Nav';
import PlayerContainer from './PlayerContainer';

export default class App extends React.Component{
  render() {
    return (
      <div>
        <Nav />
        <PlayerContainer />
      </div>
    );
  }
}
