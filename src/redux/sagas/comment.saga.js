import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment';

function* getListCommentSaga(action) {
  try {
    const { hotelId, tourId, page, limit } = action.payload;

      const result = hotelId ? 
      (
        yield axios({
        method: 'GET',
        url: 'http://localhost:3002/commentHotels',
        params: {
          _expand:"user",
          _page: page,
          _limit: limit,
          ...hotelId && { hotelId: hotelId }
        }
      })
      ) : (
      yield axios({
        method: 'GET',
        url: 'http://localhost:3002/commentTours',
        params: {
          _expand:"user",
          _page: page,
          _limit: limit,
          ...tourId && { tourId: tourId },
        }
      })
      )
    
    yield put({
      type: "GET_LIST_COMMENT_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_LIST_COMMENT_FAIL", message: e.message});
  }
}
function* addCommentSaga(action) {

  try {
    const { userId, hotelId, tourId, comment, rate } = action.payload;
    const creatDate = moment(new Date()).format('DD/MM/YYYY')
    const result = hotelId ? (
      yield axios({
        method: 'POST',
        url: 'http://localhost:3002/commentHotels',
        data: { userId, hotelId, comment, rate, creatDate }
      })
      ) : (
      yield axios({
        method: 'POST',
        url: 'http://localhost:3002/commentTours',
        data: { userId, tourId, comment, rate, creatDate }
      })
    )
    yield put({
      type: "ADD_COMMENT_SUCCESS",
      payload: {
        data: result.data[0],
      },
    });
    window.location.reload();
  } catch(e) {
    yield put({
      type: "ADD_COMMENT_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* commentSaga() {
  yield takeEvery('GET_LIST_COMMENT_REQUEST', getListCommentSaga);
  yield takeEvery('ADD_COMMENT_REQUEST', addCommentSaga);
}
