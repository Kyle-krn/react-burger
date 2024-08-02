import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    bun : null,
    selectedIngredients: [],
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: initialState,
    reducers: {
        addIngredient (state, action) {
            state.selectedIngredients.push(action.payload);
        },
        sortIngredient(state, action) {
            const { dragIndex, hoverIndex } = action.payload;
            const draggedItem = state.selectedIngredients[dragIndex];
            state.selectedIngredients.splice(dragIndex, 1);
            state.selectedIngredients.splice(hoverIndex, 0, draggedItem);
        },
        removeIngredient (state, action) {
            state.selectedIngredients.splice(action.payload, 1);
        },
        resetBurgerConstructor (state, action) {
            state.selectedIngredients = [];
        },
        setBun (state, action) {
            state.bun = action.payload;
        },
    },
  }) 


const { actions, reducer } = burgerConstructorSlice;

export const {
    addIngredient,
    removeIngredient,
    resetBurgerConstructor,
    setBun,
    sortIngredient,
} = actions;

export default reducer;
