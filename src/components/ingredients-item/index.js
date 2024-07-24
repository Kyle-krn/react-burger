import styles from './styles.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const IngredientsItem = ({image, name, price, count, id, onClick}) => {
    return (
        <div className={styles.ingredientCard} onClick={() => onClick(id)}>
            {count? <Counter count={1} size="default" extraClass="m-1" />:null}
            <img className="pl-4 pr-4" src={image} alt={name}></img>
            <span className={`mt-1 mb-1 text text_type_digits-default ${styles.ingredientCardCoast}`}>
                {price}
                <CurrencyIcon type="primary" />
            </span>
            <span className={styles.ingredientCardTitle}>{name}</span>
        </div>
    )
}

IngredientsItem.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number,
}

export default IngredientsItem;