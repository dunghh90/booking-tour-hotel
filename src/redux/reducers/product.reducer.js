const initialState = {
    productHOTELList: {
      data: [],
      load: false,
      error: '',
    },
    productHOTELDetail: {
      data: [],
      load: false,
      error: '',
    },
  };
  
  export default function productHOTELReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_PRODUCT_HOTEL_LIST_REQUEST': {
        return {
          ...state,
          productHOTELList: {
            ...state.productHOTELList,
            load: true,
          },
        }
      }
      case 'GET_PRODUCT_HOTEL_LIST_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          productHOTELList: {
            ...state.productHOTELList,
            data: data,
            load: false,
          },
        }
      }
      case 'GET_PRODUCT_HOTEL_LIST_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          productHOTELList: {
            ...state.productHOTELList,
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