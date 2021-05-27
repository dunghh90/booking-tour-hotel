import { fork } from 'redux-saga/effects';
import userSaga from './user.saga';
import productTourSaga from './product-tour.saga';
import productHotelSaga  from './product.saga';
import bookingSaga from './booking.saga';
import  cartSaga from './bookingRooms.saga';
import  commentSaga from './comment.saga';
import  profileSaga from './comment.saga';

export default function* mySaga() {
  yield fork(userSaga);
  yield fork(productTourSaga);
  yield fork(productHotelSaga);
  yield fork(bookingSaga);
  yield fork(cartSaga);
  yield fork(commentSaga);
  yield fork(profileSaga);
}