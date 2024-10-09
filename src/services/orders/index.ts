import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrdersMessage as TFeedMessage } from './types';

type OrdersState = {
  orders: Order[];
  isConnected: boolean;
  isError: boolean;
};

export const initialState: OrdersState = {
  orders: [],
  isConnected: false,
  isError: false,
};


const ordersReducer = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    wsConnectionSuccess(state) {
      state.isConnected = true;
      state.isError = false;
    },
    wsConnectionError(state) {
      state.isConnected = false;
      state.isError = true;
    },
    wsConnectionClosed(state) {
      state.isConnected = false;
    },
    wsGetMessage(state, action: PayloadAction<TFeedMessage>) {
      if (action.payload.success) {
        state.orders = action.payload.orders;
      }
    },
  },
});

export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetMessage } = ordersReducer.actions;
export default ordersReducer.reducer;