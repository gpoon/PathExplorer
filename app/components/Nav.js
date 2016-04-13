import React from 'react';

import AboutModal from './ModalComponents/AboutModal';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlight: false,
      showMenu: false
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMouseOver() {
    this.setState({highlight: true});
  }

  handleMouseOut() {
    this.setState({highlight: false});
  }

  handleMenuClick() {
    this.setState({showMenu: !this.state.showMenu});
  }

  render() {
    const navStyle = 'navbar navbar-default' + (this.state.highlight || this.state.showMenu ? ' mouseOver' : '');
    const dropdownStyle = 'dropdown-menu' + (this.state.showMenu ? ' show-nav-menu' : '');

    return (
      <nav
        className={navStyle}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <span className='navbar-brand page-title'>PATH EXPLORER</span>
        <div className='collapse navbar-collapse'>
          <ul className='nav navbar-nav navbar-left'>
            <li>
              <a href='#' onClick={this.handleMenuClick}>
                <span className='glyphicon glyphicon-menu-hamburger' />
              </a>
              <ul className={dropdownStyle}>
                <li className='nav-dropdown-item' >
                  ABOUT
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}