const initialState = {
    productHotelList: {
      data: [],
      load: false,
      error: '',
    },
    listHotel: {
      data: {
        hotels:[],
      },
      load: false,
      error: '',
    },
    listRoom: {
      data: {
        rooms: [
        ],
      },
      load: false,
      error: '',
    },

    categoryList: {
      data: [],
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
        console.log("🚀 ~ file: product.reducer.js ~ line 41 ~ productHotelReducer ~  data",  data)
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

      case 'GET_LIST_HOTEL_REQUEST': {
        return {
          ...state,
          listHotel: {
            ...state.listHotel,
            load: true,
          },
        }
      }
      case 'GET_LIST_HOTEL_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          listHotel: {
            ...state.listHotel,
            data: data,
            load: false,
          },
        }
      }
      case 'GET_LIST_HOTEL_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          listHotel: {
            ...state.listHotel,
            load: false,
            error: error,
          },
        }
      }

      case 'GET_LIST_ROOM_REQUEST': {
        return {
          ...state,
          listRoom: {
            ...state.listRoom,
            load: true,
          },
        }
      }
      case 'GET_LIST_ROOM_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          listRoom: {
            ...state.listRoom,
            data: data,
            load: false,
          },
        }
      }
      case 'GET_LIST_ROOM_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          listRoom: {
            ...state.listRoom,
            load: false,
            error: error,
          },
        }
      }

      case 'GET_CATEGORY_LIST_REQUEST': {
        return {
          ...state,
          categoryList: {
            ...state.categoryList,
            load: true,
          },
        }
      }

      case 'GET_CATEGORY_LIST_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          categoryList: {
            ...state.categoryList,
            data: data,
            load: false,
          },
        }
      }

      case 'GET_CATEGORY_LIST_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          categoryList: {
            ...state.categoryList,
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