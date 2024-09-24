import { useEffect } from "react";
import BurgerIngredients from "../../components/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor";
import styles from './styles.module.css'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { getIngredients } from "../../services/ingredients";
import ErrorServerPage from "../error/errorServer";
import { useAppDispatch, useAppSelector } from "../../services";


const IngredientsPage = () => {
    const dispatch = useAppDispatch();
    const {ingredientsRequest, ingredientsFailed, ingredients} = useAppSelector(state => state.ingredients);
    useEffect(() => {
        if (ingredients.length === 0 && !ingredientsFailed) {
            dispatch(getIngredients());
        }
    }, [dispatch, ingredients, ingredientsFailed]);


    if (ingredientsFailed) {
        return <ErrorServerPage statusCode='500' errorText='Мы уже получили сигнал и чиним 🔧'/>
    }
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