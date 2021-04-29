const initialState = {
    productHotelList: {
      data: [],
      load: false,
      error: '',
    },
    productHotelDetail: {
      data: {
        productOptions: [],
      },
      load: false,
      error: '',
    },
  };
  
  export default function productHotelReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_PRODUCT_HOTEL_LIST_REQUEST': {
        return {
          ...state,
          productHotelList: {
            ...state.productHotelList,
            load: true,
          },
        }
      }
      case 'GET_PRODUCT_HOTEL_LIST_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          productHotelList: {
            ...state.productHotelList,
            data: data,
            load: false,
          },
        }
      }
      case 'GET_PRODUCT_HOTEL_LIST_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          productHotelList: {
            ...state.productHotelList,
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