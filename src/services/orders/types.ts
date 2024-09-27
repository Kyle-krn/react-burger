
export interface OrdersMessage {
  success: boolean;
  orders: Order[];
}

export interface Order {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: 'done' | 'canceled' | 'pending';
  updatedAt: string;
  _id: string;
}

export interface OrderResponse {
  success: boolean;
  orders: Order[];
}