import React from 'react';
import PropTypes from 'prop-types';
import ProductItemButtons from '../containers/ProductItemButtons';

const ProductItem = (props) => {
  const {
    id,
    title,
    description,
    imageName,
    price,
  } = props;
  const beerImage = require(`../assets/images/${imageName}`); // eslint-disable-line import/no-dynamic-require

  return (
    <div className="product col-xs-12 col-sm-6 col-md-4 cv-extra-height">
      <div className="flex-row torp-description">
        <div className="image-wrap col-xs-5 col-sm-12">
          <img className="product-img" src={beerImage} alt="" />
        </div>
        <div className="info col-xs-8 col-sm-12">
          <h4>{title}</h4>
          <div className="description eclipse">
            <span>{description}</span>
          </div>
        </div>
      </div>
      <ProductItemButtons id={id} price={price} />
    </div>
  );
};

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductItem;
