import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './indgredients';
import ingredientDetailReducer from './ingredient-detail'

const store = configureStore({
  reducer : {
    ingredients: ingredientsReducer,
    ingredientDetail: ingredientDetailReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
}) 

export default store;