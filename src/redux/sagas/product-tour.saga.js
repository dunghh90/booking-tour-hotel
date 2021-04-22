import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getProductTourListSaga(action) {
  try {
    const { page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/tours',
      params: {
        _page: page,
        _limit: limit,
      }
    });
    yield put({
      type: "GET_PRODUCT_TOUR_LIST_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_TOUR_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getProductTourDetailSaga(action) {
  try {
    //  const user = yield call(Api.fetchUser, action.payload.userId);
    yield put({type: "GET_PRODUCT_TOUR_DETAIL_SUCCESS", user: 'user'});
  } catch (e) {
    yield put({type: "GET_PRODUCT_TOUR_DETAIL_FAIL", message: e.message});
  }
}

export default function* productTourSaga() {
  yield takeEvery('GET_PRODUCT_TOUR_LIST_REQUEST', getProductTourListSaga);
  yield takeEvery('GET_PRODUCT_TOUR_DETAIL_REQUEST', getProductTourDetailSaga);
}