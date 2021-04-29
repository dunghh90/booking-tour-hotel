import { combineReducers } from 'redux';
import taskReducer from './task.reducer';
import productTourReducer from './product-tour.reducer';
import productHotelReducer from'./product.reducer'
import userReducer from './user.reducer';


export default combineReducers({
  taskReducer: taskReducer,
  productTourReducer,
  userReducer,
  productHotelReducer,
  
})
