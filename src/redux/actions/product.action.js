export function getProductLocationListAction(params) {
    return {
      type: 'GET_PRODUCT_HOTEL_LIST_REQUEST',
      payload: params,
    }
  }
  export function getListHotelAction(params) {
    return {
      type: 'GET_LIST_HOTEL_REQUEST',
      payload: params,
    }
  }

  export function getListRoomAction(params) {
    return {
      type: 'GET_LIST_ROOM_REQUEST',
      payload: params,
    }
  }

  export function getCategoryListAction(params) {
    return {
      type: 'GET_CATEGORY_LIST_REQUEST',
      payload: params,
    }
  }
