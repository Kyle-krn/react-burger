import styles from './styles.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';


const IngredientsItem = ({image, type, name, price, id, onClick}) => {
    const [{ isDrag }, drag] = useDrag({
        type: "ingredient",
        item: { id },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    const { bun, selectedIngredients } = useSelector(state => state.burgerConstructor);
    const count = type === 'bun'
        ? bun?._id === id
            ? 1
            :0 
        : selectedIngredients.filter(item => item._id === id).length;

    return (
        <div className={`${styles.ingredientCard} ${isDrag? 'opacity-50': ''}`} onClick={() => onClick(id)} ref={drag}>
            {count? <Counter count={count} size="default" extraClass="m-1" />:null}
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
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default IngredientsItem;