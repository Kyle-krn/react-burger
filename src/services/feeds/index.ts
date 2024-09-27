import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedMessage as TFeedMessage } from './types';
import { Order } from '../orders/types';

type FeedState = {
  feeds: Order[];
  isConnected: boolean;
  isError: boolean;
  total: number;
  totalToday: number;
};

const initialState: FeedState = {
  feeds: [],
  isConnected: false,
  isError: false,
  total: 0,
  totalToday: 0,
};

const feedReducer = createSlice({
  name: 'feed',
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
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      }
    },
  },
});

export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetMessage } = feedReducer.actions;
export default feedReducer.reducer;