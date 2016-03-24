import React from 'react';

export default class Nav extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-default'>
        <div className='container'>
          <div className='navbar-header navbar-center'>
            <p className='navbar-text page-title'>
              PATH EXPLORER
            </p>
          </div>
        </div>
      </nav>
    );
  }
}