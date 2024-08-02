import { useEffect } from "react";
import BurgerIngredients from "../../components/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor";
import styles from './styles.module.css'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector, useDispatch } from "react-redux";
import { getIngredients } from "../../services/indgredients";

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

const IngredientsPage = () => {
    const dispatch = useDispatch();
    const {ingredientsRequest, ingredientsFailed, ingredients} = useSelector(state => state.ingredients);
    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <>
            <h1 className="text-align-l mt-10 mb-5 text_type_main-large">Соберите бургер</h1>
            <div className={styles.wrapper}>
                {
                ingredientsRequest === false && ingredientsFailed === false && ingredients.length > 0? 
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
                : 
                null
            }
            </div>
        </>
    );
}

export default IngredientsPage;