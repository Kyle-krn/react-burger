import { ResponseBody } from "../../utils/api"
import { Order } from "../orders/types"

export type OrderInitialStateType = {
    orderRequest: boolean,
    orderError: boolean,
    orderId: number | null,
    order: Order | null,
}

export interface CreateOrderResponse extends ResponseBody {
    name: string,
    order: {number: number}
}