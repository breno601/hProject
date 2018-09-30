import React from 'react';
import Cart from './Cart';
import Menu from './Menu';

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="logo">
        <img className="logo-img" src={require('../assets/images/output.png')} alt="" />
      </div>
      <Menu />
      <Cart />
      <div className="nav-text">
        <h1>&#39;S WERELDS BESTE BIEREN</h1>
        <span>ON TAP, AT HOME</span>
      </div>
    </div>
  );
};

export default NavBar;
