import { combineReducers } from 'redux';

import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import categoriesReducer from './category.reducer';

export const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  categories: categoriesReducer,
});