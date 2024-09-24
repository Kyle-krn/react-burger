import styles from './styles.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const FeedList = () => {
    const orders = [
        {
            id: '#034535',
            date: 'Сегодня, 16:20',
            title: 'Death Star Starship Main бургер',
            icons: [
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
            ],
            price: 480
        },
        {
            id: '#034535',
            date: 'Сегодня, 16:20',
            title: 'Death Star Starship Main бургер',
            icons: [
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
            ],
            price: 480
        },
        {
            id: '#034535',
            date: 'Сегодня, 16:20',
            title: 'Death Star Starship Main бургер',
            icons: [
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
            ],
            price: 480
        },
        {
            id: '#034535',
            date: 'Сегодня, 16:20',
            title: 'Death Star Starship Main бургер',
            icons: [
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
            ],
            price: 480
        },
        {
            id: '#034535',
            date: 'Сегодня, 16:20',
            title: 'Death Star Starship Main бургер',
            icons: [
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
                'https://code.s3.yandex.net/react/code/meat-01.png',
                'https://code.s3.yandex.net/react/code/bun-02.png',
            ],
            price: 480
        },
        // добавьте другие заказы здесь
    ];

    return (
        <div className={`${styles.blockScroll} custom-scroll`}>
            {orders.map((order, orderIndex) => (
                <div key={orderIndex} className={styles.order}>
                    <div className={styles.orderHeader}>
                        <span className={`${styles.orderId} text_type_digits-default`}>{order.id}</span>
                        <span className={`${styles.orderDate} text_type_main-default text_color_inactive`}>{order.date}</span>
                    </div>
                    <p className={`${styles.orderTitle} text_type_main-medium`}>{order.title}</p>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className={styles.imagesWrapper}>
                            {order.icons.slice(0, 5).map((item, index) => (
                                <div key={index} className={`${styles.image}`} style={{ zIndex: order.icons.length - index }}>
                                    <img src={item} alt={`icon-${index}`} />
                                </div>
                            ))}
                            {order.icons.length >= 6 && (
                                <div className={`${styles.image} ${styles.extra}`} style={{ zIndex: 0 }}>
                                    <img style={{zIndex: -1}} src={order.icons[6]} alt={`icon-6`} />
                                    <span style={{zIndex: 0}}>+{order.icons.length - 5}</span>
                                </div>
                            )}
                        </div>
                        <span className={`${styles.orderPrice} text_type_digits-default`}>{order.price} <CurrencyIcon type="primary" /></span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FeedList;