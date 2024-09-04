import { ResponseBody } from "../../utils/api"

export type OrderInitialStateType = {
    orderRequest: boolean,
    orderError: boolean,
    orderId: number | null,
}

export interface OrderResponse extends ResponseBody {
    name: string,
    order: {number: number}
}