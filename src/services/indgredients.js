import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { request } from '../utils/api';

export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async () => {
        const response = await request('/api/ingredients');
        return response.data;
    }
)

const initialState = { 
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false, 
}

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getIngredients.pending, (state) => {
        state.ingredientsRequest = true;
        state.ingredientsFailed = false;
        })
        .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredients = action.payload;
        })
        .addCase(getIngredients.rejected, (state) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
        state.ingredients = [];
        });
    },
  }) 


// const { actions, reducer } = ingredientsSlice;
// Извлекаем и экспортируем каждого создателя по названию
export default ingredientsSlice.reducer;
