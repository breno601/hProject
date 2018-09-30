import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductTable from './ProductTable';
import NavBar from './NavBar';
import PromoBar from './PromoBar';
import FloatingNav from './FloatingNavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { navOpacity: 0 };
    this.updateNavOpacity = this.updateNavOpacity.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateNavOpacity);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateNavOpacity);
  }

  updateNavOpacity() {
    const navbarHeight = 70;
    const { bottomBorderWidth, headerHeight, fadeInDistance } = this.props;
    const endFade = headerHeight - navbarHeight - bottomBorderWidth;
    const startFade = endFade - fadeInDistance;
    const scrolly = window.scrollY;
    const { opacity } = this.state;

    if (scrolly < startFade) {
      if (opacity === 0) return;
      this.setState({ navOpacity: 0 });
      return;
    }

    if (scrolly > endFade) {
      if (opacity === 1) return;
      this.setState({ navOpacity: 1 });
      return;
    }

    const pxPastStartFade = scrolly - startFade;
    const navOpacity = pxPastStartFade / (endFade - startFade);
    this.setState({ navOpacity });
  }

  render() {
    const { bottomBorderWidth } = this.props;
    const { navOpacity } = this.state;

    return (
      <div className="appContainer">
        <FloatingNav opacity={navOpacity} borderBottomWidth={bottomBorderWidth} />
        <PromoBar />
        <NavBar />
        <ProductTable key="productTable" />
      </div>
    );
  }
}

App.propTypes = {
  bottomBorderWidth: PropTypes.number,
  headerHeight: PropTypes.number,
  fadeInDistance: PropTypes.number,
};

App.defaultProps = {
  bottomBorderWidth: 2,
  headerHeight: 200,
  fadeInDistance: 40,
};

export default App;
