import { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "../ingredients-list";
import styles from './styles.module.css';
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import { useDispatch, useSelector } from "react-redux";

import { setIngredient, resetIngredient } from "../../services/ingredient-detail";

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    
    const ingredients = useSelector(state => state.ingredients.ingredients);
    const selectedIngredient = useSelector(state => state.ingredientDetail.ingredient);
    
    const [current, setCurrent] = useState('bun');
    const tabsRef = {
        bun: useRef(null),
        sauce: useRef(null),
        main: useRef(null),
    };
    const containerRef = useRef(null);
    const setTab = (value) => {
        setCurrent(value);
        tabsRef[value].current?.scrollIntoView({behavior: 'smooth'});
    }
    const handleScroll = () => {
        const bunPosition = tabsRef.bun.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top;
        const saucePosition = tabsRef.sauce.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top;
        const mainPosition = tabsRef.main.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top;

        const positions = [
            { section: 'bun', position: bunPosition },
            { section: 'sauce', position: saucePosition },
            { section: 'main', position: mainPosition }
        ];
        
        const closestSection = positions.reduce((prev, curr) => {
            return Math.abs(curr.position) < Math.abs(prev.position) ? curr : prev;
        });
        setCurrent(closestSection.section);
    }

    const handlerOpenInfo = useCallback((ingredientId) => {
        const ingredientDetail = ingredients.filter(item => item._id === ingredientId);
        dispatch(setIngredient(ingredientDetail[0]));
    }, [ingredients, dispatch]);

    const handlerCloseInfo = useCallback(() => {
        dispatch(resetIngredient());
    }, [dispatch]);

    return (
        <section className="max-width-600">
            <div className="d-flex">
                <Tab value="bun" active={current === 'bun'} onClick={setTab}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setTab}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setTab}>
                    Начинки
                </Tab>
            </div>
            <div className={`custom-scroll ${styles.ingredientsScroll}`} ref={containerRef} onScroll={handleScroll}>                
                <IngredientsList subRef={tabsRef.bun} id='bun' ingredients={ingredients.filter(item => item.type === 'bun')} title="Булки" onClick={handlerOpenInfo}/>
                <IngredientsList subRef={tabsRef.sauce} id='sauce' ingredients={ingredients.filter(item => item.type === 'sauce')} title="Соусы" onClick={handlerOpenInfo}/>
                <IngredientsList subRef={tabsRef.main} id='main' ingredients={ingredients.filter(item => item.type === 'main')} title="Начинки" onClick={handlerOpenInfo}/>
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