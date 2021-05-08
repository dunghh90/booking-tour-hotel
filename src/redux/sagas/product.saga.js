import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getProductHotelListSaga(action) {
  try {
    const { page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/hotels',
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

// sủa lại hàm này get data detail
function* getProductHotelDetailSaga(action) {
  // [Dung] Cái này không cần thiết, data trong json viết sai hotelsid -> hotelId
  // try {
  //   //  const user = yield call(Api.fetchUser, action.payload.userId);
  //   yield put({type: "GET_PRODUCT_HOTEL_DETAIL_SUCCESS", user: 'user'});
  // } catch (e) {
  //   yield put({type: "GET_PRODUCT_hotel_DETAIL_FAIL", message: e.message});
  // }

  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/hotels/${id}`,
      params: {
        __expand:"hotels",
        _embed: 'productOptionsHotels',
      }
    });
    console.log("🚀 ~ file: product.saga.js ~ line 55 ~ function*getProductHotelDetailSaga ~ result", result)
   
    yield put({
      type: "GET_PRODUCT_HOTEL_DETAIL_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_PRODUCT_HOTEL_DETAIL_FAIL", message: e.message});
  }
}
function* getProductHotelRoomSaga(action) {
 

  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3001/Room/${id}`,
      params: {
        _embed: 'Room',
      }
    });
    yield put({
      type: "GET_PRODUCT_ROOM_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_PRODUCT_ROOM_FAIL", message: e.message});
  }
}


function* getCategoryListSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/categories',
    });
    console.log("🚀 ~ file: product.saga.js ~ line 73 ~ function*getCategoryListSaga ~ result", result)
    yield put({
      type: "GET_CATEGORY_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_CATEGORY_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* productHotelSaga() {
  yield takeEvery('GET_PRODUCT_HOTEL_LIST_REQUEST', getProductHotelListSaga);
  yield takeEvery('GET_PRODUCT_HOTEL_DETAIL_REQUEST', getProductHotelDetailSaga);
  yield takeEvery('GET_CATEGORY_LIST_REQUEST', getCategoryListSaga);
  yield takeEvery('GET_PRODUCT_ROOM_REQUEST', getProductHotelRoomSaga);
}
