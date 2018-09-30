import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';

const ProductRow = (props) => {
  const { products } = props;
  const productsRow = products.map((product) => {
    return (
      <ProductItem
        key={product.id}
        id={product.id}
        imageName={product.imageName}
        title={product.title}
        description={product.description}
        price={product.price}
      />
    );
  });

  return (
    <div className="products row">
      {productsRow}
    </div>
  );
};

ProductRow.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageName: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProductRow;
