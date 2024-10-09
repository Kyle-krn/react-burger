import styles from './styles.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { IngredientsItemType } from './types';
import { useAppSelector } from '../../services';


const IngredientsItem: FC<IngredientsItemType> = ({image, type, name, price, id}) => {
    const location = useLocation();

    const [{ isDrag }, drag] = useDrag({
        type: "ingredient",
        item: { id },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    const { bun, selectedIngredients } = useAppSelector(state => state.burgerConstructor);

    const count = type === 'bun'
        ? bun?._id === id
            ? 1
            :0 
        : selectedIngredients.filter(item => item._id === id).length;

    return (
            <>
            <Link
                key={id}
                to={`/ingredients/${id}`}
                state={{background: location}}
            >
                <div data-cy={type === 'bun'? 'ingredient-bun': 'ingredient-item'} className={`${styles.ingredientCard} ${isDrag? 'opacity-50': ''}`} ref={drag}>
                    {count? <Counter count={count} size="default" extraClass="m-1" />:null}
                    <img className="pl-4 pr-4" src={image} alt={name}></img>
                    <span className={`mt-1 mb-1 text text_type_digits-default ${styles.ingredientCardCoast}`}>
                        {price}
                        <CurrencyIcon type="primary" />
                    </span>
                    <span className={styles.ingredientCardTitle}>{name}</span>
                </div>
            </Link>
            </>
    )
}


export default IngredientsItem;