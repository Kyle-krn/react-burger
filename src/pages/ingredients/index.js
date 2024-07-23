import { useEffect, useState } from "react";
import BurgerIngredients from "../../components/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor";
import styles from './styles.module.css'

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

const IngredientsPage = () => {
    const [state, setState] = useState({
        ingredientData: [],
        isLoading: false,
        error: null,
    })

    useEffect(() => {
        const getIngredients = async () => {
            try {
                setState({ ...state, isLoading: true, error: null });
                const res = await fetch(API_URL);
                const data = await res.json();
                setState({
                    ingredientData: data.data,
                    isLoading: false,
                    error: null,
                });
            } catch (error) {
                setState({...state, isLoading: false, error: error.message });                
            }
        }
        getIngredients();
    }, []); 
    return (
        <>
            <h1 className="text-align-l mt-10 mb-5 text_type_main-large">Соберите бургер</h1>
            <div className={styles.wrapper}>
                {
                state.isLoading === false && state.error === null && state.ingredientData.length > 0? 
                <>
                    <BurgerIngredients ingredientData={state.ingredientData}/>
                    <BurgerConstructor ingredientData={state.ingredientData}/>
                </>
                : 
                null
            }
            </div>
        </>
    );
}

export default IngredientsPage;