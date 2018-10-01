import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';

class ProductItemButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
    };
  }

  handleRemoveOne = () => {
    let { quantity } = this.state;

    if (quantity === '' || quantity === null) {
      quantity = 1;
    } else {
      quantity -= 1;
    }

    if (quantity > 0) {
      this.setState({
        quantity,
      });
    }
  }

  handleAddOne = () => {
    let { quantity } = this.state;

    this.setState((prevState) => {
      if (quantity === '' || quantity === null) {
        quantity = 1;
      } else {
        quantity = prevState.quantity + 1;
      }

      return {
        quantity,
      };
    });
  }

  handleManualChangeQuantity = (event) => {
    let { value } = event.target;
    if (value && value === '0') {
      value = 1;
    }

    this.setState({
      quantity: value,
    });
  }

  handleAddToCart(id) {
    let { quantity } = this.state;
    const { addProductToCart } = this.props;

    if (quantity === '' || quantity === null || quantity === '0') {
      quantity = 1;

      this.setState({
        quantity,
      });
    }

    addProductToCart(id, parseInt(quantity, 10));
  }

  renderActionCartButton() {
    const {
      id,
      price,
    } = this.props;

    return (
      <div className="input-group">
        {
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
        }<a className="action-cart">
          <button type="button" className="add-to-cart button-red" onClick={this.handleAddToCart.bind(this, id)}>
            <span className="new-price"> €{price}</span>
          </button>{
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
        }</a>
      </div>
    );
  }

  renderQuantityButton() {
    const { quantity } = this.state;

    return (
      <div className="input-group">
        <span className="input-group-btn">
          <button type="button" onClick={this.handleRemoveOne} className="btn quantity-selector btn-number"><span className="glyphicon glyphicon-minus" /></button>
        </span>
        <input className="input-number" type="number" min="1" max="99" name="quantity" value={quantity} onChange={this.handleManualChangeQuantity} />
        <span className="input-group-btn">
          <button type="button" onClick={this.handleAddOne} className="btn quantity-selector btn-number"><span className="glyphicon glyphicon-plus" /></button>
        </span>
      </div>
    );
  }

  render() {
    const quantityInfo = '€1,06 / Biertje (25cl)';

    return (
      <div className="flex-column torp-cart-buttons">
        <div className="product-info">
          <div className="cart-product">
            <div className="quantity-field-mobile">
              {this.renderQuantityButton()}
            </div>
            <div className="cart-actions">
              {this.renderActionCartButton()}
            </div>
            <div className="beer-extra-info">
              {quantityInfo}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductItemButtons.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  addProductToCart: PropTypes.func.isRequired,
};

ProductItemButtons.default = {
  quantity: 1,
};

export default connect(null, actions)(ProductItemButtons);
