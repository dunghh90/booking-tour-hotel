import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getProductHotelListSaga(action) {
  try {
    const { page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/hotels',
      params: {
        _page: page,
        _limit: limit,
        // ...catagoryId && { catagoryId },// categoryId: categoryId -> null, truyen Id khi ton taij'
        // ...searchkey && { q: searchkey },
        // _sort: 'price',
        // _order: 'dest',
      }
    });
    yield put({
      type: "GET_PRODUCT_HOTEL_LIST_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_HOTEL_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getProductHotelDetailSaga(action) {
  try {
    //  const user = yield call(Api.fetchUser, action.payload.userId);
    yield put({type: "GET_PRODUCT_HOTEL_DETAIL_SUCCESS", user: 'user'});
  } catch (e) {
    yield put({type: "GET_PRODUCT_hotel_DETAIL_FAIL", message: e.message});
  }
}

export default function* productHotelSaga() {
  yield takeEvery('GET_PRODUCT_HOTEL_LIST_REQUEST', getProductHotelListSaga);
  yield takeEvery('GET_PRODUCT_HOTEL_DETAIL_REQUEST', getProductHotelDetailSaga);
}