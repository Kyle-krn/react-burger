import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ingredient: null,
}

const ingredientDetailSlice = createSlice({
    name: 'ingredient-detail',
    initialState: initialState,
    reducers: {
        setIngredient(state, action) {
            state.ingredient = action.payload
        },
        resetIngredient(state) {
            state.ingredient = null
        }
    },
  }) 


export const {
    setIngredient,
    resetIngredient,
} = ingredientDetailSlice.actions;

export default ingredientDetailSlice.reducer;
