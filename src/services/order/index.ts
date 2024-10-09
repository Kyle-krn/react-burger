import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { request } from '../../utils/api';
import { OrderInitialStateType, CreateOrderResponse } from './types';
import { RootState } from '..';
import { Order, OrderResponse } from '../orders/types';

const initialState: OrderInitialStateType = {
    orderRequest: false,
    orderError: false,
    orderId: null,
    order: null,
}

export interface GetOrderRequest {
    id: string
}

export const getOrder = createAsyncThunk<Order, GetOrderRequest>(
    'orders/getOrder',
    async ({id}) => {
        const response = await request<OrderResponse>(`/api/orders/${id}`);
        if (response.orders.length === 0) {
          throw Error('Заказ не найден')
        }
        return response.orders[0];
    }
  )

export const createOrder = createAsyncThunk<CreateOrderResponse, void, {state: RootState}>(
    'order/createOrder',
    async (_, {getState}) => {
        const state = getState();
        const {bun, selectedIngredients} = state.burgerConstructor;
        const ingredientIds = [];
        ingredientIds.push(bun?._id);
        ingredientIds.push(...selectedIngredients.map(item => item._id));
        const response = await request<CreateOrderResponse>('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
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
        resetOrder (state) {
            return initialState;
        },
        setSelectedOrder (state, action: PayloadAction<Order>) {
            state.order = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.orderRequest = true;
            state.orderError = false;
            })
        .addCase(createOrder.fulfilled, (state, action: PayloadAction<CreateOrderResponse>) => {
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
        })

        .addCase(getOrder.pending, (state) => {
            state.orderRequest = true;
            state.orderError = false;
            })
        .addCase(getOrder.fulfilled, (state, action: PayloadAction<Order>) => {
            state.orderRequest = false;
            state.order = action.payload;
        })
        .addCase(getOrder.rejected, (state) => {
            state.orderRequest = false;
            state.orderError = true;
            state.order = null;
        });
    },
  }) 


const { actions, reducer } = orderSlice;

export const { resetOrder, setSelectedOrder } = actions;
export default reducer;
