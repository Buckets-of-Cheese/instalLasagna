import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../styles/hamburgerMenu.scss'
  
const HamburgerMenu = () => {
  return (
    <Menu>
      {/* Menu items */}
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/about">
        About
      </a>
      <a className="menu-item" href="/contact">
        Contact
      </a>
    </Menu>
  );
};

export default HamburgerMenu;
