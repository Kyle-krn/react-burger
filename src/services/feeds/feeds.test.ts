import reducer, {
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage,
  } from './index';
  import { TFeedMessage } from './types';
  import { Order} from '../orders/types'; 
  import { initialState } from './index';

  describe('feedReducer', () => {
    const mockOrders: Order[] = [
      {
        createdAt: '2024-01-01T00:00:00Z',
        ingredients: ['ingredient1', 'ingredient2'],
        name: 'Test Order 1',
        number: 1,
        status: 'done',
        updatedAt: '2024-01-01T01:00:00Z',
        _id: 'order-id-1',
      },
      {
        createdAt: '2024-01-02T00:00:00Z',
        ingredients: ['ingredient3', 'ingredient4'],
        name: 'Test Order 2',
        number: 2,
        status: 'pending',
        updatedAt: '2024-01-02T01:00:00Z',
        _id: 'order-id-2',
      },
    ];
  
    const mockMessage: TFeedMessage = {
      success: true,
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    };
  
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle wsConnectionSuccess', () => {
      const newState = reducer(initialState, wsConnectionSuccess());
  
      expect(newState).toEqual({
        ...initialState,
        isConnected: true,
        isError: false,
      });
    });
  
    it('should handle wsConnectionError', () => {
      const newState = reducer(initialState, wsConnectionError());
  
      expect(newState).toEqual({
        ...initialState,
        isConnected: false,
        isError: true,
      });
    });
  
    it('should handle wsConnectionClosed', () => {
      const newState = reducer(
        {
          ...initialState,
          isConnected: true,
        },
        wsConnectionClosed()
      );
  
      expect(newState).toEqual({
        ...initialState,
        isConnected: false,
      });
    });
  
    it('should handle wsGetMessage with success=true', () => {
      const newState = reducer(initialState, wsGetMessage(mockMessage));
  
      expect(newState).toEqual({
        ...initialState,
        feeds: mockOrders,
        total: mockMessage.total,
        totalToday: mockMessage.totalToday,
      });
    });
  
    it('should not update state when wsGetMessage has success=false', () => {
      const failedMessage: TFeedMessage = {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      };
  
      const newState = reducer(initialState, wsGetMessage(failedMessage));
  
      expect(newState).toEqual(initialState);
    });
  });