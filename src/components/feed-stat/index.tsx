import styles from './styles.module.css'


const FeedStat = () => {
    const readyOrders = ['034533', '034532', '034530', '034527', '034525'];
    const inProgressOrders = ['034538', '034541', '034542'];
    const totalOrders = 28752;
    const todayOrders = 138;

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
                <p className={`${styles.countValue} text_type_digits-large`}>{totalOrders.toLocaleString()}</p>
            </div>
            
            <div className={styles.countBoard}>
                <h2 className={`${styles.countTitle} text_type_main-medium`}>Выполнено за сегодня:</h2>
                <p className={`${styles.countValue} text_type_digits-large`}>{todayOrders}</p>
            </div>
        </div>
    )
}

export default FeedStat;