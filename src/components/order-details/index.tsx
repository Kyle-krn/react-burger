import styles from './styles.module.css';
import done from '../../image/done.png';
import { FC } from 'react';
import { OrderDetailType } from './types';

const OrderDetails: FC<OrderDetailType> = ({orderId, orderError, orderRequest}) => {
    return (
        <div className='d-flex flex-column text-align-center'>
            {orderError && <p data-cy="order-error" className='mb-15 text_type_main-medium'>Что то пошло не так...</p>}
            {orderRequest && <p className='mb-15 text_type_main-medium'>Создаем заказ</p>}
            {orderId && 
                <>
                    <span data-cy="order-id" className='text text_type_digits-large mt-5 mb-8'>{orderId}</span>
                    <span className='mb-15'>идентификатор заказа</span>
                    <img className={`mb-15 ${styles.icon}`} src={done} alt='done'/>
                    <span className='mb-2'>Ваш заказ начали готовить</span>
                    <span className='mb-30'>Дождитесь готовности на орбитальной станции</span>
                </>
            }
        </div>
    )
}

export default OrderDetails;