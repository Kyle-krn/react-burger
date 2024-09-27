
import { Action } from 'redux';

export enum WebSocketActionTypes {
    FEED_WS_CONNECT = 'FEED_WS_CONNECT',
    FEED_WS_DISCONNECT = 'FEED_WS_DISCONNECT',
    FEED_WS_ERROR = 'FEED_WS_ERROR',
    FEED_WS_MESSAGE = 'FEED_WS_MESSAGE',    
    ORDERS_WS_CONNECT = 'ORDERS_WS_CONNECT',
    ORDERS_WS_DISCONNECT = 'ORDERS_WS_DISCONNECT',
    ORDERS_WS_ERROR = 'ORDERS_WS_ERROR', 
    ORDERS_WS_MESSAGE = 'ORDERS_WS_MESSAGE', 
  }



// Определим интерфейсы для каждого из возможных экшенов WebSocket для orders
interface OrdersWSConnectionSuccessAction extends Action<typeof WebSocketActionTypes.ORDERS_WS_CONNECT> {}
interface OrdersWSConnectionErrorAction extends Action<typeof WebSocketActionTypes.ORDERS_WS_ERROR> {}
interface OrdersWSConnectionClosedAction extends Action<typeof WebSocketActionTypes.ORDERS_WS_DISCONNECT> {}
interface OrdersWSGetMessageAction extends Action<typeof WebSocketActionTypes.ORDERS_WS_MESSAGE> {
    payload: any; // Здесь можно более точно типизировать данные сообщения
}

// Определим общий тип для всех экшенов WebSocket для orders
export type OrdersWebSocketActions =
    | OrdersWSConnectionSuccessAction
    | OrdersWSConnectionErrorAction
    | OrdersWSConnectionClosedAction
    | OrdersWSGetMessageAction;


    interface FeedWSConnectionSuccessAction extends Action<typeof WebSocketActionTypes.FEED_WS_CONNECT> {}
    interface FeedWSConnectionErrorAction extends Action<typeof WebSocketActionTypes.FEED_WS_ERROR> {}
    interface FeedWSConnectionClosedAction extends Action<typeof WebSocketActionTypes.FEED_WS_DISCONNECT> {}
    interface FeedWSGetMessageAction extends Action<typeof WebSocketActionTypes.FEED_WS_MESSAGE> {
        payload: any; // Здесь можно более точно типизировать данные сообщения
    }
    
    // Определим общий тип для всех экшенов WebSocket для feed
    export type FeedWebSocketActions =
        | FeedWSConnectionSuccessAction
        | FeedWSConnectionErrorAction
        | FeedWSConnectionClosedAction
        | FeedWSGetMessageAction;