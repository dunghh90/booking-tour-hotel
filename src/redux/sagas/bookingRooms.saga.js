import { put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import axios from 'axios';

function* bookingHotelRoom(action) {
  try {
    const { userId, hotelId, roomId, startDate, endDate,page,limit } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3002/bookingRooms',
      params:{
        _page: page,
        _limit: limit
      },
      data: {
        userId,
        hotelId,
        roomId,
        startDate,
        endDate
      }
    });
    yield notification.open({
      message: 'Đặt phòng thành công',
      description: `Bạn đã đặt phòng từ ${startDate} - ${endDate}`,
    });
    yield put({
      type: "BOOKING_HOTEL_ROOM_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "BOOKING_HOTEL_ROOM_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}
function* getBookingHotels(action) {
  try {
    const { userId, page, limit } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3002/bookingRooms',
      params:{
        _page: page,
        _limit: limit,
        userId
      }
    });
    console.log("🚀 ~ file: bookingRooms.saga.js ~ line 54 ~ function*getBookingHotels ~ result", result)
    yield put({
      type: "GET_BOOKING_HOTEL_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_BOOKING_HOTEL_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* cartSaga() {
  yield takeEvery('BOOKING_HOTEL_ROOM_REQUEST', bookingHotelRoom);
  yield takeEvery('GET_BOOKING_HOTEL_REQUEST', getBookingHotels);
  
}
