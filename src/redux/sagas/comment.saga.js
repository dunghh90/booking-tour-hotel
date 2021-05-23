import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getListCommentHotelSaga(action) {
  try {
    const { hotelId, page, limit } = action.payload;

    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/commentHotels',
      params: {
        _expand:"user",
        _page: page,
        _limit: limit,
        ...hotelId && { hotelId: hotelId }
      }
    });
    
    yield put({
      type: "GET_LIST_COMMENT_HOTEL_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_LIST_COMMENT_HOTEL_FAIL", message: e.message});
  }
}
function* getListCommentTourSaga(action) {
  try {
    const { tourId, page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/commentTours',
      params: {
        _expand: "user",
        _page: page,
        _limit: limit,
        ...tourId && { tourId: tourId },
      }
    });
    
    yield put({
      type: "GET_LIST_COMMENT_TOUR_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_LIST_COMMENT_TOUR_FAIL", message: e.message});
  }
}


export default function* commentSaga() {
  yield takeEvery('GET_LIST_COMMENT_HOTEL_REQUEST', getListCommentHotelSaga);
  yield takeEvery('GET_LIST_COMMENT_TOUR_REQUEST', getListCommentTourSaga);
}
