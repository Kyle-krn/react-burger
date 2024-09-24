import styles from './styles.module.css';
import IngredientsItem from "../ingredients-item";
import { FC } from 'react';
import { IngredientsListType } from './types';

const IngredientsList: FC<IngredientsListType> = ({title, ingredients, id, subRef}) => {
    return (
        <div className="mt-10" id={id}>
            <p className={`text-align-l mb-6 text_type_main-medium`} ref={subRef}>{title}</p>  
            <div className={styles.cardsWrapper}>
                {ingredients.map(item => (                    
                    <IngredientsItem key={item._id} name={item.name} type={item.type} price={item.price} image={item.image} id={item._id}/>
                ))}
            </div>
        </div>
    )
}

export default IngredientsList;