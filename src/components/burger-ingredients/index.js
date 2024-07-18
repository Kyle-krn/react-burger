import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "../ingredients-list";
import styles from './styles.module.css';


const BurgerIngredients = ({IngredientData}) => {
    const [current, setCurrent] = useState('bun');

    useEffect(() => {
		document.querySelector(`#${current}`)?.scrollIntoView({behavior: 'smooth'});
	},[current])

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
                <IngredientsList id='bun' ingredients={IngredientData.filter(item => item.type === 'bun')} title="Булки"/>
                <IngredientsList id='sauce' ingredients={IngredientData.filter(item => item.type === 'sauce')} title="Соусы"/>
                <IngredientsList id='main' ingredients={IngredientData.filter(item => item.type === 'main')} title="Начинки"/>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    IngredientData: PropTypes.arrayOf(PropTypes.object),
};

export default BurgerIngredients;