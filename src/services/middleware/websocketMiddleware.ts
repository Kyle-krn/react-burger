import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "..";
import { WebSocketActionTypes } from "../actions";

import { PayloadAction } from '@reduxjs/toolkit';

export interface IWebSocketActions {
  wsConnectionSuccess: () => PayloadAction;
  wsConnectionError: () => PayloadAction;
  wsConnectionClosed: () => PayloadAction;
  wsGetMessage: (message: any) => PayloadAction<any>; // Замените any на конкретный тип сообщения
}

export type AppAction = 
  | ReturnType<IWebSocketActions['wsConnectionSuccess']>
  | ReturnType<IWebSocketActions['wsConnectionError']>
  | ReturnType<IWebSocketActions['wsConnectionClosed']>
  | ReturnType<IWebSocketActions['wsGetMessage']>;

export const createSocketMiddleware = (
  wsUrl: string,
  withAuth: boolean,
  actions: IWebSocketActions, 
  connectType: WebSocketActionTypes, 
  disconnectType: WebSocketActionTypes
): Middleware => {
    return (storeAPI: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;
  
      return (next) => (action: any) => {
        const { dispatch } = storeAPI;
        const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetMessage } = actions;
  
        if (action.type === connectType) {
          if (withAuth) {
            const accessToken = localStorage.getItem('accessToken');
            wsUrl = wsUrl + `?token=${accessToken}`
          }
          socket = new WebSocket(wsUrl);
          
          socket.onopen = () => dispatch(wsConnectionSuccess());
          socket.onerror = () => dispatch(wsConnectionError());
          socket.onmessage = (event) => dispatch(wsGetMessage(JSON.parse(event.data)));
          socket.onclose = () => dispatch(wsConnectionClosed());
        }
  
        if (action.type === disconnectType && socket) {
          socket.close();
        }
  
        return next(action);
      };
    };
  };