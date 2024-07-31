import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "../ingredients-list";
import styles from './styles.module.css';
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/indgredients";

import { setIngredient, resetIngredient } from "../../services/ingredient-detail";

const BurgerIngredients = () => {
    const ingredients = useSelector(state => state.ingredients.ingredients);

    const dispatch = useDispatch();

    const [current, setCurrent] = useState('bun');
    const selectedIngredient = useSelector(state => state.ingredientDetail.ingredient);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    useEffect(() => {
		document.querySelector(`#${current}`)?.scrollIntoView({behavior: 'smooth'});
	},[current]);

    const handlerOpenInfo = useCallback((ingredientId) => {
        const ingredientDetail = ingredients.filter(item => item._id === ingredientId);
        dispatch(setIngredient(ingredientDetail[0]));
    }, [ingredients, dispatch, setIngredient]);

    const handlerCloseInfo = useCallback(() => {
        dispatch(resetIngredient());
    }, [dispatch, resetIngredient]);
    
    return (
        <section className="max-width-600">
            <div className="d-flex">
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={`custom-scroll ${styles.ingredientsScroll}`}>
                <IngredientsList id='bun' ingredients={ingredients.filter(item => item.type === 'bun')} title="Булки" onClick={handlerOpenInfo}/>
                <IngredientsList id='sauce' ingredients={ingredients.filter(item => item.type === 'sauce')} title="Соусы" onClick={handlerOpenInfo}/>
                <IngredientsList id='main' ingredients={ingredients.filter(item => item.type === 'main')} title="Начинки" onClick={handlerOpenInfo}/>
            </div>
            {selectedIngredient && 
                <Modal title="Детали ингредиента" onClose={handlerCloseInfo}>
                    <IngredientDetails 
                        image={selectedIngredient.image_large}
                        name={selectedIngredient.name}
                        proteins={selectedIngredient.proteins}
                        fat={selectedIngredient.fat}
                        calories={selectedIngredient.calories}
                        carbohydrates={selectedIngredient.carbohydrates}
                    />
                </Modal>
            }
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredientData: PropTypes.arrayOf(PropTypes.object),
};

export default BurgerIngredients;