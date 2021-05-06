export function getProductHotelListAction(params) {
    return {
      type: 'GET_PRODUCT_HOTEL_LIST_REQUEST',
      payload: params,
    }
  }
  export function getProductDetailAction(params) {
    return {
      type: 'GET_PRODUCT_HOTEL_DETAIL_REQUEST',
      payload: params,
    }
  }

  export function getCategoryListAction(params) {
    console.log("🚀 ~ file: product.action.js ~ line 15 ~ getCategoryListAction ~ params", params)
    return {
      type: 'GET_CATEGORY_LIST_REQUEST',
      payload: params,
    }
  }