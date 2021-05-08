export function getProductHotelListAction(params) {
    return {
      type: 'GET_PRODUCT_HOTEL_LIST_REQUEST',
      payload: params,
    }
  }
  export function getProductDetailAction(params) {
    console.log("🚀 ~ file: product.action.js ~ line 8 ~ getProductDetailAction ~ params", {
      type: 'GET_PRODUCT_HOTEL_DETAIL_REQUEST',
      payload: params,
    })
    return {
      type: 'GET_PRODUCT_HOTEL_DETAIL_REQUEST',
      payload: params,
    }
  }

  export function getCategoryListAction(params) {
    return {
      type: 'GET_CATEGORY_LIST_REQUEST',
      payload: params,
    }
  }

  export function getProductRoomAction(params) {
    return {
      type: 'GET_PRODUCT_ROOM_REQUEST',
      payload: params,
    }
  }