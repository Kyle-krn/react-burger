import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../utils/apiConfig';

export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async () => {
        const response = await fetch(`${API_URL}/api/ingredients`);
        const data = await response.json();
        return data.data;
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
        });
    },
  }) 


// const { actions, reducer } = ingredientsSlice;
// Извлекаем и экспортируем каждого создателя по названию
export default ingredientsSlice.reducer;
