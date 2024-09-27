import { Order } from "../orders/types";

export interface FeedMessage {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
}