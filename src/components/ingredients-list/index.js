import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import IngredientsItem from "../ingredients-item";

const IngredientsList = ({title, ingredients, id, onClick, subRef}) => {
    return (
        <div className="mt-10" id={id}>
            <p className={`text-align-l mb-6 text_type_main-medium`} ref={subRef}>{title}</p>  
            <div className={styles.cardsWrapper}>
                {ingredients.map(item => <IngredientsItem key={item._id} name={item.name} price={item.price} image={item.image} count={0} id={item._id} onClick={onClick}/>)}
            </div>
        </div>
    )
}

IngredientsList.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    // subRef: PropTypes.ref,
}

export default IngredientsList;