export function getCommentHotelAction(params) {
  return {
    type: 'GET_LIST_COMMENT_HOTEL_REQUEST',
    payload: params,
  }
}
export function getCommentTourAction(params) {
  return {
    type: 'GET_LIST_COMMENT_TOUR_REQUEST',
    payload: params,
  }
}
