import { useAppSelector } from '../../services';
import styles from './styles.module.css'


const FeedStat = () => {
    const {feeds} = useAppSelector(state => state.feeds)
    const readyOrders = feeds.filter(item => item.status === 'done').slice(0,10).map(item => item.number);
    const inProgressOrders = feeds.filter(item => item.status === 'pending').map(item => item.number);
    const {total, totalToday } = useAppSelector(state => state.feeds)

    return  (
        <div className={styles.container}>
            <div className={styles.statusBoard}>
                <div className={styles.column}>
                    <h2 className={`${styles.columnTitle} text_type_main-medium`}>Готовы:</h2>
                    <ul className={styles.orderList}>
                        {readyOrders.map((order, index) => (
                            <li key={index} className={`${styles.orderItem} text_type_digits-default`}>{order}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.column}>
                    <h2 className={`${styles.columnTitle} text_type_main-medium`}>В работе:</h2>
                    <ul className={styles.orderList}>
                        {inProgressOrders.map((order, index) => (
                            <li key={index} className={`${styles.orderItemInProgress} text_type_digits-default`}>{order}</li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <div className={styles.countBoard}>
                <h2 className={`${styles.countTitle} text_type_main-medium`}>Выполнено за все время:</h2>
                <p className={`${styles.countValue} text_type_digits-large`}>{total}</p>
            </div>
            
            <div className={styles.countBoard}>
                <h2 className={`${styles.countTitle} text_type_main-medium`}>Выполнено за сегодня:</h2>
                <p className={`${styles.countValue} text_type_digits-large`}>{totalToday}</p>
            </div>
        </div>
    )
}

export default FeedStat;