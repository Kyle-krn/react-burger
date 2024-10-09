import { useEffect } from "react";
import FeedList from "../../components/feed-list";
import { useAppDispatch, useAppSelector } from "../../services";
import { WebSocketActionTypes } from "../../services/actions";

const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector(state => state.orders) 
    useEffect(() => {
        dispatch({ type: WebSocketActionTypes.ORDERS_WS_CONNECT });
    
        return () => {
            dispatch({ type: WebSocketActionTypes.ORDERS_WS_DISCONNECT });
        };
        }, [dispatch]
    );
    
    return (
        <FeedList feeds={orders}/>
    )
}

export default OrdersPage;