import BurgerIngredients from "../../components/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor";
import styles from './styles.module.css'
import { INGREDIENT_DATA } from "../../utils/data";

const IngredientsPage = () => {
    return (
        <>
            <h1 className="text-align-l mt-10 mb-5 text_type_main-large">Соберите бургер</h1>
            <div className={styles.wrapper}>
                <BurgerIngredients ingredientData={INGREDIENT_DATA}/>
                <BurgerConstructor ingredientData={INGREDIENT_DATA}/>
            </div>
        </>
    );
}

export default IngredientsPage;