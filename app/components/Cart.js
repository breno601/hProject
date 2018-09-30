import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CalculateAmountSelector from '../selectors/selectedProducts';

/* TODO add counter logic in cart on add to cart action -> DONE
used reselect for memoization and performance. */
const Cart = (props) => {
  const { amountOfProducts } = props;

  return (
    <div className="cart">
      <div className="cartCounter">
        <a href="/foo/bar">
          <span className="notify-badge">{amountOfProducts}</span>
          <img className="cart-img" src={require('../assets/images/cart.png')} alt="" />
        </a>
      </div>
      <div className="profile">
        <img className="profile-img" src={require('../assets/images/profile.png')} alt="" />
      </div>
      <div className="search">
        <img className="search-img" src={require('../assets/images/lupa.png')} alt="" />
      </div>
    </div>
  );
};

Cart.propTypes = {
  amountOfProducts: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
    amountOfProducts: CalculateAmountSelector(state),
  };
}

export default connect(mapStateToProps)(Cart);
