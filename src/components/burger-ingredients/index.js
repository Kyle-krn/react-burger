import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "../ingredients-list";
import styles from './styles.module.css';
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";

const BurgerIngredients = ({ingredientData}) => {
    const [current, setCurrent] = useState('bun');
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    useEffect(() => {
		document.querySelector(`#${current}`)?.scrollIntoView({behavior: 'smooth'});
	},[current]);

    const handlerOpenInfo = useCallback((ingredientId) => {
        const ingredientDetail = ingredientData.filter(item => item._id === ingredientId);
        setSelectedIngredient(ingredientDetail[0]);
    }, [ingredientData, setSelectedIngredient]);

    const handlerCloseInfo = useCallback(() => {
        setSelectedIngredient(null);
    }, []);
    
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
                <IngredientsList id='bun' ingredients={ingredientData.filter(item => item.type === 'bun')} title="Булки" onClick={handlerOpenInfo}/>
                <IngredientsList id='sauce' ingredients={ingredientData.filter(item => item.type === 'sauce')} title="Соусы" onClick={handlerOpenInfo}/>
                <IngredientsList id='main' ingredients={ingredientData.filter(item => item.type === 'main')} title="Начинки" onClick={handlerOpenInfo}/>
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