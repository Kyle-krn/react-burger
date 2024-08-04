import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './indgredients';
import ingredientDetailReducer from './ingredient-detail';
import burgerConstrucorReducer from './constructor';
import orderReducer from './order';


const store = configureStore({
  reducer : {
    ingredients: ingredientsReducer,
    ingredientDetail: ingredientDetailReducer,
    burgerConstructor: burgerConstrucorReducer,
    order: orderReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
}) 

export default store;