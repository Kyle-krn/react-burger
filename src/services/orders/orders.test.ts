import ordersReducer, {
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage,
    initialState,
  } from './index';
  import { PayloadAction } from '@reduxjs/toolkit'
  import { OrdersMessage, Order } from './types';
  
  describe('ordersReducer', () => {
    it('должен вернуть начальное состояние', () => {
      const result = ordersReducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  
    it('должен устанавливать isConnected в true при wsConnectionSuccess', () => {
      const result = ordersReducer(initialState, wsConnectionSuccess());
      expect(result.isConnected).toBe(true);
      expect(result.isError).toBe(false);
    });
  
    it('должен устанавливать isConnected в false и isError в true при wsConnectionError', () => {
      const result = ordersReducer(initialState, wsConnectionError());
      expect(result.isConnected).toBe(false);
      expect(result.isError).toBe(true);
    });
  
    it('должен устанавливать isConnected в false при wsConnectionClosed', () => {
      const state = { ...initialState, isConnected: true };
      const result = ordersReducer(state, wsConnectionClosed());
      expect(result.isConnected).toBe(false);
    });
  
    it('должен обновлять заказы при wsGetMessage с успешным ответом', () => {
      const mockOrders: Order[] = [
        {
          createdAt: '2024-10-01T10:00:00Z',
          ingredients: ['ingredient1', 'ingredient2'],
          name: 'Order 1',
          number: 123,
          status: 'done',
          updatedAt: '2024-10-01T10:00:00Z',
          _id: 'order1',
        },
        {
          createdAt: '2024-10-02T10:00:00Z',
          ingredients: ['ingredient3', 'ingredient4'],
          name: 'Order 2',
          number: 456,
          status: 'pending',
          updatedAt: '2024-10-02T10:00:00Z',
          _id: 'order2',
        },
      ];
  
      const action: PayloadAction<OrdersMessage> = {
        type: wsGetMessage.type,
        payload: {
          success: true,
          orders: mockOrders,
        },
      };
  
      const result = ordersReducer(initialState, wsGetMessage(action.payload));
      expect(result.orders).toEqual(mockOrders);
    });
  
    it('не должен обновлять заказы при wsGetMessage с неуспешным ответом', () => {
      const action: PayloadAction<OrdersMessage> = {
        type: wsGetMessage.type,
        payload: {
          success: false,
          orders: [],
        },
      };
  
      const result = ordersReducer(initialState, wsGetMessage(action.payload));
      expect(result.orders).toEqual([]);
    });
  });
  