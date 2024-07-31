import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ingredient: null,
    // _id: null,
    // name: null,
    // type: null,
    // proteins: null,
    // fat: null,
    // carbohydrates: null,
    // calories: null,
    // price: null,
    // image: null,
    // image_mobile: null,
    // image_large: null,
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
