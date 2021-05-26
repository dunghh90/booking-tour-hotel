const initialState = {
    bookingRooms: {
      data: [],
      load: false,
      error: '',
    },
  };
  
  export default function bookingHotelReducer(state = initialState, action) {
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
      case 'GET_BOOKING_HOTEL_REQUEST': {
        return {
          ...state,
          bookingRooms: {
            ...state.bookingRooms,
            load: true,
          },
        }
      }

      case 'GET_BOOKING_HOTEL_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          bookingRooms: {
            ...state.bookingRooms,
            data: data,
            load: false,
          },
        }
      }
      case 'GET_BOOKING_HOTEL_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          bookingRooms: {
            ...state.bookingRooms,
            load: false,
            error: error,
          },
        }
      }

      
      default: {
        return state;
      }
    }
  }

  