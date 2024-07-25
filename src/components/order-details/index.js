import styles from './styles.module.css'
import done from '../../image/done.png';
import PropTypes from 'prop-types';

const OrderDetails = ({orderId}) => {
    return (
        <div className='d-flex flex-column text-align-center'>
            <span className='text text_type_digits-large mt-5 mb-8'>{orderId}</span>
            <span className='mb-15'>идентификатор заказа</span>
            <img className={`mb-15 ${styles.icon}`} src={done}/>
            <span className='mb-2'>Ваш заказ начали готовить</span>
            <span className='mb-30'>Дождитесь готовности на орбитальной станции</span>
        </div>
    )
}

OrderDetails.propTypes = {
    orderId: PropTypes.number.isRequired,
}

export default OrderDetails;