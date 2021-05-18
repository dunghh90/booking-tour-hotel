import { combineReducers } from 'redux';
import taskReducer from './task.reducer';
import productTourReducer from './product-tour.reducer';
import productHotelReducer from'./product.reducer'
import userReducer from './user.reducer';
<<<<<<< HEAD
import bookingReducer from './booking.reducer';
=======
>>>>>>> 88f785a41d91df9f2fdf357509cde30261f5a3da
import bookingReducer from './bookingRoom.reducer';


export default combineReducers({
  taskReducer: taskReducer,
  productTourReducer,
  userReducer,
  productHotelReducer,
<<<<<<< HEAD
  bookingReducer
=======
  bookingReducer,

  
>>>>>>> 88f785a41d91df9f2fdf357509cde30261f5a3da
})
