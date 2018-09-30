import { createSelector } from 'reselect';
import _ from 'lodash';

const cartSelector = state => state.cart;

const calculateAmount = ({ products }) => {
  let totalAmount = 0;

  _.forEach(products, (product) => {
    totalAmount += product.amount;
  });

  return totalAmount;
};

export default createSelector(cartSelector, calculateAmount);
