import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    bun: '',
    ingredients: [],
    sum: 0, 
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: initialState,
    reducers: {
        setBun (state, action) {
            state.bun = action.payload;
        },
        addIngredient (state, action) {
            state.ingredients.push(action.payload);
        },
        removeIngredient (state, action) {
            state.ingredients.map(ingredient => ingredient._id != action.payload);
        },
        resetBurgerConstructor (state, action) {
            state.ingredients = [];
        }
    },
  }) 


const { actions, reducer } = burgerConstructorSlice;

export const {
    addIngredient,
    removeIngredient,
    resetBurgerConstructor,
    setBun,
} = actions;

export default reducer;
