import { WebSocketActionTypes } from "../actions";
import { wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetMessage } from "../orders";
import { createSocketMiddleware } from "./websocketMiddleware";


const ordersMiddleware =  createSocketMiddleware('wss://norma.nomoreparties.space/orders', true, {
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage,
}, WebSocketActionTypes.ORDERS_WS_CONNECT, WebSocketActionTypes.ORDERS_WS_DISCONNECT)

export default ordersMiddleware;