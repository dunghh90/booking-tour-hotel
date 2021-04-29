export function getProductHotelListAction(params) {
    return {
      type: 'GET_PRODUCT_HOTEL_LIST_REQUEST',
      payload: params,
    }
  }
  export function getProductDetailAction(params) {
    return {
      type: 'GET_PRODUCT_DETAIL_REQUEST',
      payload: params,
    }
  }