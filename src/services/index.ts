import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients';
import burgerConstrucorReducer from './constructor';
import orderReducer from './order';
import userReducer from './user';
import feedReducer from './feeds';
import ordersReducer from './orders';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import feedMiddleware from './middleware/feedWS';
import ordersMiddleware from './middleware/ordersWS';

const store = configureStore({
  reducer : {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstrucorReducer,
    order: orderReducer,
    orders: ordersReducer,
    auth: userReducer,
    feeds: feedReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedMiddleware, ordersMiddleware),
}) 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;