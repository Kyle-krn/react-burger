import { Order } from "../orders/types";

export type FeedState = {
  feeds: Order[];
  isConnected: boolean;
  isError: boolean;
  total: number;
  totalToday: number;
};

export interface TFeedMessage {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
}