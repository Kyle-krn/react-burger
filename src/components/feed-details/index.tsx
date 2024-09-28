import { useLocation, useParams } from "react-router-dom";
import styles from './styles.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientImage from "../ingredient-image";
import { useAppDispatch, useAppSelector } from "../../services";
import { useEffect, useMemo } from "react";
import { getOrder, setSelectedOrder } from "../../services/order";
import formatDate from "../../utils/formatDate";


const FeedDetails = () => {
    const statusMap = {
        done: 'Выполнен',
        canceled: 'Отменен',
        pending: 'Готовится'
    }
    const { id } = useParams() as { id: string };

    const dispatch = useAppDispatch();
    const { order, orderError, orderRequest } = useAppSelector(state => state.order)
    const { feeds } = useAppSelector(state => state.feeds)
    const allIngredients = useAppSelector(state => state.ingredients.ingredients)

    const getIngredients = useMemo(() => {
        return (ingredientsStringArr: string[]) => {
            return allIngredients.filter(item => ingredientsStringArr.includes(item._id));
        };
    }, [allIngredients]);

    const getOrderCoast = (ingredientsStringArr: string[]) => {
        const ingredients = getIngredients(ingredientsStringArr);
        return ingredients.reduce((acc, item) => acc + item.price, 0)
    }
    useEffect(() => {
        if (id) {
            const findFeed = feeds.find(item => item.number.toLocaleString() === id)
            if (findFeed) { 
                dispatch(setSelectedOrder(findFeed))
            } else {
                dispatch(getOrder({id}))
            }
        }
    }, [dispatch, feeds, id])

    const location = useLocation();
    const background = location.state?.background;
    
    if (orderRequest) {
        return <span>Идет загрузка</span>
    }

    if (orderError) {
        return <span>Произошла ошибка</span>
    }

    
    return (
        <div className={styles.main}>
            {order &&
            <>
                {!background && <p className='mt-5 text-align-center text_type_digits-default'>#{order._id}</p>}
                <p className="mt-10 mb-3 text_type_main-medium">{order.name}</p>
                <p className={`${order.status === 'done' ? styles.SuccessTitle: styles.errorTitle} mb-15`}>{statusMap[order.status]}</p>
                <p className="mb-6 text_type_main-medium">Состав: </p>
                <div className={`${styles.feedItems} mb-10 custom-scroll`}>
                        {getIngredients(order.ingredients).map(item => (
                            <div key={item._id} className={`${styles.feedItem}`}>
                                <span className="mr-8">
                                <IngredientImage img={item.image}/>
                                </span>
                                <span className="">{item.name}</span>
                                <span className={`${styles.feedItemCoast} text_type_digits-default`}>{order.ingredients.filter(ingredient => ingredient === item._id).length} x {item.price} <CurrencyIcon type="primary" /></span>
                            </div>
                            
                        ))}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <span className="">{formatDate(order.updatedAt)}</span>
                    <span className="d-flex align-items-center">
                        {getOrderCoast(order.ingredients)} 
                        <CurrencyIcon type="primary" />
                    </span>
                </div>
            </>
            }
        </div>
    )
}

export default FeedDetails;