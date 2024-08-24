import PropTypes from 'prop-types';
import styles from './styles.module.css';
import IngredientsItem from "../ingredients-item";
import { ingredientPropType } from './types';

const IngredientsList = ({title, ingredients, id, subRef}) => {
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

IngredientsList.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
    id: PropTypes.string.isRequired,
    subRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }),
}

export default IngredientsList;