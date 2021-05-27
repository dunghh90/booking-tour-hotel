// import {
//   GET_PRODUCT_LIST,
// } from '../constants';

export function getProductTourListAction(params) {
  return {
    type: 'GET_PRODUCT_TOUR_LIST_REQUEST',
    payload: params,
  }
}


export function getProductTourDetailAction(params) {
  return {
    type: 'GET_PRODUCT_TOUR_DETAIL_REQUEST',
    payload: params,
  }
}



