import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import shortid from 'shortid';
import ProductRow from '../components/ProductRow';
import '../assets/scss/main.scss';
import * as actions from '../actions';

class ProductTable extends Component {
  componentWillMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  render() {
    const { products } = this.props;
    const productsRows = _.chunk(products, 3);
    const title = 'JOUW FAVORIETE BIEREN';

    return (
      <div className="container">
        <div className="product-title">
          <h1>{title}</h1>
        </div>
        {productsRows.map(
          (product, i) => <ProductRow key={shortid.generate()} products={product[i]} />,
        )}
      </div>
    );
  }
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.array,
  ).isRequired,
  fetchProducts: PropTypes.func.isRequired,
};

function mapStateToProps({ products }) {
  return {
    products,
  };
}

export default connect(mapStateToProps, actions)(ProductTable);
