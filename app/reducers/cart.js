import { ADD_PRODUCT_TO_CART } from '../actions/types';

const INITIAL_STATE = {
  products: [],
  shipping_value: 0,
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return { ...state, shipping_value: 100, products: [...state.products, action.payload] };
    default:
      return state;
  }
}
