import styles from './styles.module.css';
import done from '../../image/done.png';
import PropTypes from 'prop-types';

const OrderDetails = ({orderId, orderError, orderRequest}) => {
    return (
        <div className='d-flex flex-column text-align-center'>
            {orderError && <p className='mb-15 text_type_main-medium'>Что то пошло не так...</p>}
            {orderRequest && <p className='mb-15 text_type_main-medium'>Создаем заказ</p>}
            {orderId && 
                <>
                    <span className='text text_type_digits-large mt-5 mb-8'>{orderId}</span>
                    <span className='mb-15'>идентификатор заказа</span>
                    <img className={`mb-15 ${styles.icon}`} src={done} alt='done'/>
                    <span className='mb-2'>Ваш заказ начали готовить</span>
                    <span className='mb-30'>Дождитесь готовности на орбитальной станции</span>
                </>
            }
        </div>
    )
}

OrderDetails.propTypes = {
    orderId: PropTypes.number,
    orderError: PropTypes.bool.isRequired,
    orderRequest: PropTypes.bool.isRequired,
}

export default OrderDetails;