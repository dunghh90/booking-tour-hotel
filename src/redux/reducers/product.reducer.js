const initialState = {
    productHotelList: {
      data: [],
      load: false,
      error: '',
    },
    listHotel: {
      data: [],
      load: false,
      error: '',
    },
    listRoom: {
      data: {
        rooms: [
        ],
        bookingRooms:[],
      },
      load: false,
      error: '',
    },
    rateList:{
      data: [],
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
        
        // const { data } = action.payload;
        // return {
        //   ...state,
        //   listHotel: {
        //     ...state.listHotel,
        //     data: data,
        //     load: false,
        //   },
        // }



        const { data, page, more } = action.payload;
        console.log("🚀 ~ file: product.reducer.js ~ line 93 ~ productHotelReducer ~ data", data)
        if (more) {
          return {
            ...state,
            listHotel: {
              ...state.listHotel,
              data: [
                ...state.listHotel.data,
                ...data,
              ],
              page: page,
              load: false,
            },
          }
        } else {
          return {
            ...state,
            listHotel: {
              ...state.listHotel,
              data: data,
              page: page,
              load: false,
            },
          }
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
      case 'GET_RATE_LIST_REQUEST': {
        return {
          ...state,
          rateList: {
            ...state.rateList,
            load: true,
          },
        }
      }
      
      case 'GET_RATE_LIST_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          rateList: {
            ...state.rateList,
            data: data,
            load: false,
          },
        }
      }
      
      case 'GET_RATE_LIST_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          rateList: {
            ...state.rateList,
            load: false,
            error: error,
          },
        }
      }
      case 'BOOKING_HOTEL_ROOM_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          listRoom: {
            ...state.listRoom,
            data: {
              ...state.listRoom.data,
              bookingRooms: [
                ...state.listRoom.data.bookingRooms,
                data,
              ]
            },
          },
        }
      }
      case 'GET_LIST_HOTEL_BY_RATE_REQUEST': {
        return {
          ...state,
          listHotel: {
            ...state.listHotel,
            load: true,
          },
        }
      }
      case 'GET_LIST_HOTEL_BY_RATE_SUCCESS': {
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
      case 'GET_LIST_HOTEL_BY_RATE_FAIL': {
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
      
      
      default: {
        return state;
      }
   }
  }