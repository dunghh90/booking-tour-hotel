const initialState = {
  bookingRooms: {
    data: [],
    load: false,
    error: '',
  },
  bookingTours: {
    data: [],
    load: false,
    error: '',
  },
};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case 'BOOKING_HOTEL_ROOM_REQUEST': {
      const { carts } = action.payload;
      return {
        ...state,
        bookingRooms: {
          ...state.bookingRooms,
          data: carts,
          load: false,
        },
      }
    }
    case 'BOOKING_TOUR_REQUEST': {
      const { carts } = action.payload;
      return {
        ...state,
        bookingTours: {
          ...state.bookingTours,
          data: carts,
          load: false,
        },
      }
    }
    case 'GET_BOOKING_TOUR_REQUEST': {
      const cartList = JSON.parse(localStorage.getItem('carts'));
      return {
        ...state,
        bookingTours: {
          ...state.bookingTours,
          data: cartList,
          load: false,
        },
      }
    }

    
    default: {
      return state;
    }
  }
}
