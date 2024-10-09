import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { request } from '../../utils/api';
import { Ingredient, IngredientInitialState, IngredientsResponse } from './types';



export const getIngredients = createAsyncThunk<Ingredient[]>(
    'ingredients/getIngredients',
    async () => {
        const response = await request<IngredientsResponse>('/api/ingredients');
        return response.data;
    }
)

export const initialState: IngredientInitialState = { 
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
        .addCase(getIngredients.fulfilled, (state, action: PayloadAction<Ingredient[]>) => {
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


export default ingredientsSlice.reducer;
