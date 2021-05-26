import { combineReducers } from 'redux';
import taskReducer from './task.reducer';
import productTourReducer from './product-tour.reducer';
import productHotelReducer from'./product.reducer'
import userReducer from './user.reducer';
import bookingTourReducer from './booking.reducer';
import bookingReducer from './bookingRoom.reducer';
import commentReducer from './comment.reducer';
import profileReducer from './comment.reducer';


export default combineReducers({
  taskReducer: taskReducer,
  productTourReducer,
  userReducer,
  productHotelReducer,
  bookingReducer,
  bookingTourReducer,
  commentReducer,
  profileReducer

})
