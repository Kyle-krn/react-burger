import { createSocketMiddleware } from './websocketMiddleware';
import { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetMessage } from '../feeds/index';
import { WebSocketActionTypes } from '../actions';

const feedMiddleware = createSocketMiddleware('wss://norma.nomoreparties.space/orders/all', false, {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage,
},  WebSocketActionTypes.FEED_WS_CONNECT, WebSocketActionTypes.FEED_WS_DISCONNECT);

export default feedMiddleware;