import PropTypes from 'prop-types';
import React from 'react';
import Cart from './Cart';
import Menu from './Menu';

const FloatingNav = (props) => {
  const { opacity: currentOpacity, bottomBorderWidth: currentBottomBorderWidth } = props;
  const opacity = (currentOpacity) ? Math.max(currentOpacity, 0.2) : 0;
  const borderBottomWidth = (currentOpacity === 1) ? currentBottomBorderWidth : 0;

  return (
    <div className="floating-navBar navbar navbar-default navbar-static-top" role="navigation" style={{ opacity, borderBottomWidth }}>
      <div className="container">
        <div className="navbar-header">
          <a href="/foo/bar" className="navbar-brand">
            <img className="float-logo-img" src={require('../assets/images/sub-black.png')} alt="" />
          </a>
        </div>
        <div className="collapse navbar-collapse">
          <Menu />
          <Cart />
        </div>
      </div>
    </div>
  );
};

FloatingNav.propTypes = {
  opacity: PropTypes.number.isRequired,
  bottomBorderWidth: PropTypes.number,
};

FloatingNav.defaultProps = {
  bottomBorderWidth: 0,
};

export default FloatingNav;
