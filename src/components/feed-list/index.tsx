import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientImage from '../ingredient-image';
import { useAppSelector } from '../../services';
import formatDate from '../../utils/formatDate';
import { FC, useMemo } from 'react';
import { Order } from '../../services/orders/types';

type TFeedList = {
    feeds: Order[]
}

const FeedList: FC<TFeedList> = ({feeds}) => {
    const location = useLocation();
    
    const allIngredients = useAppSelector(state => state.ingredients.ingredients);
    
    const getIngredients = useMemo(() => {
        return (ingredientsStringArr: string[]) => {
            return allIngredients.filter(item => ingredientsStringArr.includes(item._id));
        };
    }, [allIngredients]);

    const getOrderCoast = (ingredientsStringArr: string[]) => {
        const ingredients = getIngredients(ingredientsStringArr);
        return ingredients.reduce((acc, item) => acc + item.price, 0)
    }
    return (
        <div className={`${styles.blockScroll} custom-scroll`} style={{width: location.pathname === '/profile/orders'? '100%': '600px'}}>
            {feeds.map((order, orderIndex) => (
                <Link
                    key={order._id}
                    to={location.pathname === '/profile/orders'? `${order.number}` : `/feed/${order.number}`}
                    state={{background: location}}
                >
                    <div key={orderIndex} className={styles.order}>
                        <div className={styles.orderHeader}>
                            <span className={`${styles.orderId} text_type_digits-default`}>#{order.number}</span>
                            <span className={`${styles.orderDate} text_type_main-default text_color_inactive`}>{formatDate(order.updatedAt)}</span>
                        </div>
                        <p className={`${styles.orderTitle} text_type_main-medium`}>{order.name}</p>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className={styles.imagesWrapper}>
                                {getIngredients(order.ingredients).slice(0, 5).map((item, index) => (
                                    <IngredientImage key={index} zIndex={order.ingredients.length - index} img={item.image}/>
                                ))}
                                {order.ingredients.length >= 6 && (
                                    <IngredientImage zIndex={0} img={getIngredients([order.ingredients[5]])[0]?.image || ''} count={order.ingredients.length - 5}/>
                                )}
                            </div>
                            <span className={`${styles.orderPrice} text_type_digits-default`}>{getOrderCoast(order.ingredients)} <CurrencyIcon type="primary" /></span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default FeedList;