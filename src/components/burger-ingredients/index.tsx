import { useState, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "../ingredients-list";
import styles from './styles.module.css';
import { useAppSelector } from "../../services";


const BurgerIngredients = () => {
    const ingredients = useAppSelector(state => state.ingredients.ingredients);
    
    const [current, setCurrent] = useState('bun');
    const tabsRef = {
        bun: useRef<HTMLParagraphElement>(null),
        sauce: useRef<HTMLParagraphElement>(null),
        main: useRef<HTMLParagraphElement>(null),
    };
    const containerRef = useRef<HTMLDivElement>(null);
    const setTab = (value: 'bun' | 'sauce' | 'main') => {
        setCurrent(value);
        tabsRef[value].current?.scrollIntoView({behavior: 'smooth'});
    }
    const handleScroll = () => {
        if (tabsRef.bun.current && tabsRef.sauce.current && tabsRef.main.current && containerRef.current) {
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
    }

    return (
        <section className="max-width-600">
            <div className="d-flex">
                <Tab value="bun" active={current === 'bun'} onClick={e => setTab('bun')}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={e => setTab('sauce')}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={e => setTab('main')}>
                    Начинки
                </Tab>
            </div>
            <div className={`custom-scroll ${styles.ingredientsScroll}`} ref={containerRef} onScroll={handleScroll}>                
                <IngredientsList subRef={tabsRef.bun} id='bun' ingredients={ingredients.filter(item => item.type === 'bun')} title="Булки" />
                <IngredientsList subRef={tabsRef.sauce} id='sauce' ingredients={ingredients.filter(item => item.type === 'sauce')} title="Соусы" />
                <IngredientsList subRef={tabsRef.main} id='main' ingredients={ingredients.filter(item => item.type === 'main')} title="Начинки" />
            </div>
        </section>
    )
}

export default BurgerIngredients;