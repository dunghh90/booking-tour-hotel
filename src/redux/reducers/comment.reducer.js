const initialState = {
  commentHotelList: {
    data: [],
    load: false,
    error: '',
  },
  commentTourList: {
    data: [],
    load: false,
    error: '',
  },

};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_LIST_COMMENT_HOTEL_REQUEST': {
      return {
        ...state,
        commentHotelList: {
          ...state.commentHotelList,
          load: true,
        },
      }
    }
    case 'GET_LIST_COMMENT_HOTEL_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        commentHotelList: {
          ...state.commentHotelList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_LIST_COMMENT_HOTEL_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        commentHotelList: {
          ...state.commentHotelList,
          load: false,
          error: error,
        },
      }
    }
    case 'GET_LIST_COMMENT_TOUR_REQUEST': {
      return {
        ...state,
        commentHotelList: {
          ...state.commentTourList,
          load: true,
        },
      }
    }
    case 'ET_LIST_COMMENT_TOUR_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        commentTourList: {
          ...state.commentTourList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_LIST_COMMENT_TOUR_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        commentTourList: {
          ...state.commentTourList,
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