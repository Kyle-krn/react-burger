import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients';
import burgerConstrucorReducer from './constructor';
import orderReducer from './order';
import userReducer from './user';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer : {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstrucorReducer,
    order: orderReducer,
    auth: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
}) 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;