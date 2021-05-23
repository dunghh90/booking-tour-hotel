import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getProductHotelListSaga(action) {
  try {
    const { page, limit} = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/locations',
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
      type: "GET_LOCATION_LIST_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "GET_LOCATION_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getListHotelSaga(action) {

  try {
    const { id,more,page,limit,rate } = action.payload;
    const result = yield axios({
      method: 'GET',

      url: 'http://localhost:3002/hotels',
      params: {
        _page: page,
        _limit: limit,
        ...id && { locationId: id },
        ...rate && { rate }
      
      }
    });
    console.log("🚀 ~ file: product.saga.js ~ line 59 ~ function*getListHotelSaga ~ action.payload", action.payload)
    console.log("🚀 ~ file: product.saga.js ~ line 60 ~ function*getListHotelSaga ~ result", result)
    
    yield put({
      type: "GET_LIST_HOTEL_SUCCESS",
      payload: {
        data: result.data,
        more,
        page
      },
    });
  } catch (e) {
    yield put({type: "GET_LIST_HOTEL_FAIL", message: e.message});
  }
}

function* getListRoomSaga(action) {
  
  // Chỗ này e phải lấy data của hotel chứ
  // Do e đặt tên bảng lojn xộn nên gây nhầm lẫn
  
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3002/hotels/${id}?_embed=rooms&_embed=bookingRooms&_expand=location`,
      
    });
    
    yield put({
      type: "GET_LIST_ROOM_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_LIST_ROOM_FAIL", message: e.message});
  }
}

function* getCategoryListSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/categories',
    });
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
function* getRateListSaga(action) {
  
  try {
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/rates',
      // params: {
        //   _embed: "hotels", 
        // }
      });
      yield put({
        type: "GET_RATE_LIST_SUCCESS",
        payload: {
          data: result.data,
        },
      });
    } catch (e) {
      yield put({
        type: "GET_RATE_LIST_FAIL",
        payload: {
          error: e.error
        },
      });
    }
  }

export default function* productHotelSaga() {
  yield takeEvery('GET_LOCATION_LIST_REQUEST', getProductHotelListSaga);
  yield takeEvery('GET_LIST_HOTEL_REQUEST', getListHotelSaga);
  yield takeEvery('GET_CATEGORY_LIST_REQUEST', getCategoryListSaga);
  yield takeEvery('GET_RATE_LIST_REQUEST', getRateListSaga);
  yield takeEvery('GET_LIST_ROOM_REQUEST', getListRoomSaga);
}
