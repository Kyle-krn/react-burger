import { useEffect } from 'react';
import FeedList from '../../components/feed-list'
import FeedStat from '../../components/feed-stat'
import { useAppDispatch, useAppSelector } from '../../services';
import styles from './styles.module.css'
import { WebSocketActionTypes } from '../../services/actions';

const FeedPage = () => {
    const dispatch = useAppDispatch();
    const { feeds } = useAppSelector(state => state.feeds) 
    useEffect(() => {
        dispatch({ type: WebSocketActionTypes.FEED_WS_CONNECT });
    
        return () => {
            dispatch({ type: WebSocketActionTypes.FEED_WS_DISCONNECT });
        };
        }, [dispatch]
    );
    
    return (
        <>
            <h1 className="text-align-l mt-10 mb-5 text_type_main-large">Лента заказов</h1>
            <div className={styles.wrapper}>
                <FeedList feeds={feeds}/>
                <FeedStat />
            </div>
        </>
    )
}

export default FeedPage