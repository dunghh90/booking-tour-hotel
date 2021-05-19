export function bookingHotelRoomAction(params) {
  return {
    type: 'BOOKING_HOTEL_ROOM_REQUEST',
    payload: params,
  }
}

export function bookingTourAction(params) {
  return {
    type: 'BOOKING_TOUR_REQUEST',
    payload: params,
  }
}
export function getBookingTourAction(params) {
  return {
    type: 'GET_BOOKING_TOUR_REQUEST',
    payload: params,
  }
}


