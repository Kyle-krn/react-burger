import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { request } from '../utils/api';

const initialState = {
    orderRequest: false,
    orderError: false,
    orderId: null,
}

export const createOrder = createAsyncThunk(
    'burgerConstructor/createOrder',
    async (_, {getState}) => {
        const state = getState();
        const {bun, selectedIngredients} = state.burgerConstructor;
        const ingredientIds = [];
        ingredientIds.push(bun._id);
        ingredientIds.push(...selectedIngredients.map(item => item._id));
        const response = await request('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ingredients: ingredientIds}),
        })
        return response;
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        resetOrder (state, action) {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.orderRequest = true;
            state.orderError = false;
            })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.orderRequest = false;
            if (action.payload.success) {
                state.orderId = action.payload.order.number;
            } else {
                state.orderError = true;
            }
        })
        .addCase(createOrder.rejected, (state) => {
            state.orderRequest = false;
            state.orderError = true;
            state.orderId = null;
        });
    },
  }) 


const { actions, reducer } = orderSlice;

export const { resetOrder} = actions;
export default reducer;
