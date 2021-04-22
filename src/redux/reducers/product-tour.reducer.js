const initialState = {
  productTourList: {
    data: [],
    load: false,
    error: '',
  },
  productTourDetail: {
    data: [],
    load: false,
    error: '',
  },
};

export default function productTourReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCT_TOUR_LIST_REQUEST': {
      return {
        ...state,
        productTourList: {
          ...state.productTourList,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_TOUR_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productTourList: {
          ...state.productTourList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_PRODUCT_TOUR_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productTourList: {
          ...state.productTourList,
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