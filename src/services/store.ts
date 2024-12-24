import {
  configureStore,
  combineSlices,
  combineReducers
} from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredients/ingredientSlice';
import { constructorSlice } from './burger-constructor/constructorslice';
import { feedSlice } from './feed/feedSlice';
import { userSlice } from './user/userSlice';
import { orderSlice } from './order/orderSlice';
import { profileOrderSlice } from './profile-orders/profileOrderSlice';

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  orderSlice,
  feedSlice,
  userSlice,
  profileOrderSlice
); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

// export type RootState = ReturnType<typeof rootReducer>;

// export type AppDispatch = typeof store.dispatch;

// export const useDispatch: () => AppDispatch = () => dispatchHook();
// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
