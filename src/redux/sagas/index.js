import { fork } from 'redux-saga/effects';
import userSaga from './user.saga';
import productTourSaga from './product-tour.saga';
import productHotelSaga  from './product.saga';
import bookingSaga from './booking.saga';

export default function* mySaga() {
  yield fork(userSaga);
  yield fork(productTourSaga);
  yield fork(productHotelSaga);
  yield fork(bookingSaga);
}