import { FETCH_PRODUCTS, ADD_PRODUCT_TO_CART } from './types';

const productList = [
  {
    id: 1249,
    imageName: 'cruz_especial.png',
    title: 'Cruz Campo Especial',
    description: 'An amazing beer everyone should try anytime soon.',
    price: '9.99',
  },
  {
    id: 2848,
    imageName: 'lachouffe_glass.png',
    title: 'La Chouffe',
    description: 'An amazing beer everyone should try anytime soon.',
    price: '15.99',
  },
  {
    id: 2843,
    imageName: 'torp-gruzcampo.png',
    title: 'Cruz campo',
    description: 'An amazing beer everyone should try anytime soon.',
    price: '10.89',
  },
  {
    id: 2853,
    imageName: 'torp-gruzcampo.png',
    title: 'Itaipava',
    description: 'An amazing beer everyone should try anytime soon.',
    price: '10.89',
  },
  {
    id: 2863,
    imageName: 'lachouffe_glass.png',
    title: 'Brahma',
    description: 'An amazing beer everyone should try anytime soon.',
    price: '10.89',
  },
  {
    id: 2873,
    imageName: 'cruz_especial.png',
    title: 'Heineken',
    description: 'An amazing beer everyone should try anytime soon.',
    price: '10.89',
  },
];

export function fetchProducts() {
  return {
    type: FETCH_PRODUCTS,
    payload: productList,
  };
}

export function addProductToCart(id, amount) {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: { id, amount },
  };
}
