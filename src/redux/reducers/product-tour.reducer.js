const initialState = {
  productTourList: {
    data: [],
    load: false,
    error: '',
  },
  productTourDetail: {
    data: {
      location: {},
      productTourOption: [],
    },
    load: false,
    error: '',
  },
};

export default function productTourReducer(state = initialState, action) {
  switch (action.type) {
    // Tour list
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
    // Tour detail
    case 'GET_PRODUCT_TOUR_DETAIL_REQUEST': {
      return {
        ...state,
        productTourDetail: {
          ...state.productTourDetail,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_TOUR_DETAIL_SUCCESS': {
      const { data } = action.payload;
      console.log("🚀 ~ file: product-tour.reducer.js ~ line 63 ~ productTourReducer ~ data", {
        ...state,
        productTourDetail: {
          ...state.productTourDetail,
          data: data,
          load: false,
        }})
      return {
        ...state,
        productTourDetail: {
          ...state.productTourDetail,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_PRODUCT_TOUR_DETAIL_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productTourList: {
          ...state.productTourDetail,
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