import PropTypes from 'prop-types';
import styles from './styles.module.css'
import IngredientsItem from "../ingredients-item";

const IngredientsList = ({title, ingredients, id}) => {
    return (
        <div className="mt-10" id={id}>
            <p className={`text-align-l mb-6 text_type_main-medium`}>{title}</p>  
            <div className={styles.cardsWrapper}>
                {ingredients.map(item => <IngredientsItem key={item._id} name={item.name} price={item.price} image={item.image}/>)}
            </div>
        </div>
    )
}

IngredientsList.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.string.isRequired,
}

export default IngredientsList;