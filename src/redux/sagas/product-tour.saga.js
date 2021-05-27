import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getProductTourListSaga(action) {
  try {
    const { page, limit, locationId } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/tours',
      params: {
        _page: page,
        _limit: limit,
        _expand: "location",
        ...locationId && { locationId }
        // ...catagoryId && { catagoryId },// categoryId: categoryId -> null, truyen Id khi ton taij'
        // ...searchkey && { q: searchkey },
        // _sort: 'price',
        // _order: 'dest',
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
    const { id } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/tours/${id}`,
      params: {
        // _embed: 'productOptions',
        _expand: 'tourDescription'
      }
    });
    yield put({
      type: "GET_PRODUCT_TOUR_DETAIL_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_PRODUCT_TOUR_DETAIL_FAIL", message: e.message});
  }
}


export default function* productTourSaga() {
  yield takeEvery('GET_PRODUCT_TOUR_LIST_REQUEST', getProductTourListSaga);
  yield takeEvery('GET_PRODUCT_TOUR_DETAIL_REQUEST', getProductTourDetailSaga);
  
}