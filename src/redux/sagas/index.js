import { fork } from 'redux-saga/effects';
import userSaga from './user.saga';
import productTourSaga from './product-tour.saga';

export default function* mySaga() {
  yield fork(userSaga);
  yield fork(productTourSaga);
}