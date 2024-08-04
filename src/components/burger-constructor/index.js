import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';
import { useCallback, useEffect, useMemo} from 'react';
import Modal from '../modal';
import OrderDetails from '../order-details';
import { addIngredient, removeIngredient, resetBurgerConstructor, sortIngredient } from '../../services/constructor';
import { createOrder, resetOrder } from '../../services/order';
import { useSelector, useDispatch } from 'react-redux';
import { setBun } from '../../services/constructor';
import { useDrop } from 'react-dnd';
import DraggableIngredient from '../draggable-element';


const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const {bun, selectedIngredients} = useSelector(state => state.burgerConstructor);
    const {orderId, orderError, orderRequest} = useSelector(state => state.order);
    const allIngredients = useSelector(state => state.ingredients.ingredients);
    
    const totalCoast = useMemo(() => {
        const bunCoast = bun? bun.price * 2 : 0;
        const ingredientsCoast = selectedIngredients.reduce((acc, item) => acc + item.price, 0);
        return bunCoast + ingredientsCoast;
    }, [bun, selectedIngredients]);

    const buns = useMemo(() => allIngredients.filter(item => item.type === 'bun'), [allIngredients]);
    useEffect(() => {
        if (!bun && buns.length > 0) {
            dispatch(setBun(buns[0]));
        }
    }, [dispatch, bun, buns]);

    const [, drop] = useDrop({
        accept: 'ingredient',
        drop({id}) {
            const ingredient = allIngredients.find(item => item._id === id);
            if (ingredient.type === 'bun') {
                dispatch(setBun(ingredient));
            } else {
                dispatch(addIngredient(ingredient));
            }
        },
    });

    const onDeleteIngredient = useCallback((index) => {
        dispatch(removeIngredient(index));
    }, [dispatch]);

    const onSubmit = useCallback(() => {
        dispatch(createOrder());
    }, [dispatch])

    const handlerCloseModal = useCallback(() => {
        dispatch(resetBurgerConstructor());
        dispatch(resetOrder());
    }, [dispatch]);
    
    const onSortIngredient = (dragIndex, hoverIndex) => {
        dispatch(sortIngredient({dragIndex, hoverIndex}));
    }
    return (
    <>
        <div className={`d-flex flex-column ${styles.constructorWrapper}`} ref={drop}>
            <section className={styles.constructorList}>
                <div className='pl-15'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun?.name} (верх)`}
                        price={bun?.price}
                        thumbnail={bun?.image}
                        />
                </div>
                <div className={`custom-scroll ${styles.constructorScroll}`}>
                    <div className={`pl-15 ${styles.constructorList}`}>
                        {selectedIngredients.map((item, index) => {
                            return <DraggableIngredient key={index} index={index} item={item} name={item.name} price={item.price} image={item.image} onDrop={onSortIngredient} onDeleteIngredient={onDeleteIngredient}/>
                        })}
                    </div>
                </div>
                <div className='pl-15'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun?.name} (низ)`}
                        price={bun?.price}
                        thumbnail={bun?.image}
                        />
                </div>
            </section>
            <div className="d-flex align-items-center mr-4 justify-content-end">
                <span className="text text_type_digits-medium mr-10">{totalCoast} <CurrencyIcon/></span>
                <Button htmlType='submit' onClick={onSubmit}>
                    Оформить заказ
                </Button>
            </div>
        </div>
        {(orderId || orderError || orderRequest) && (
            <Modal onClose={handlerCloseModal}>
                <OrderDetails orderId={orderId} orderError={orderError} orderRequest={orderRequest}/>
            </Modal>
        )}
    </>
    );
}

export default BurgerConstructor;