import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useMemo} from 'react';
import Modal from '../modal';
import OrderDetails from '../order-details';
import { addIngredient, removeIngredient, resetBurgerConstructor, sortIngredient } from '../../services/constructor';
import { createOrder, resetOrder } from '../../services/order';
import { setBun } from '../../services/constructor';
import { useDrop } from 'react-dnd';
import DraggableIngredient from '../draggable-element';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services";
import React from "react";
import styles from './styles.module.css'



const BurgerConstructor = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {bun, selectedIngredients} = useAppSelector(state => state.burgerConstructor);
    const {user} = useAppSelector(state => state.auth)
    const {orderId, orderError, orderRequest} = useAppSelector(state => state.order);
    const allIngredients = useAppSelector(state => state.ingredients.ingredients);

    
    const totalCoast = useMemo(() => {
        const bunCoast = bun? bun.price * 2 : 0;
        const ingredientsCoast = selectedIngredients.reduce((acc, item) => acc + item.price, 0);
        return bunCoast + ingredientsCoast;
    }, [bun, selectedIngredients]);


    const [, drop] = useDrop<{id: string}>({
        accept: 'ingredient',
        drop({id}) {
            const ingredient = allIngredients.find(item => item._id === id);
            if (!ingredient) {
                return
            }

            if (ingredient.type === 'bun') {
                dispatch(setBun(ingredient));
            } else {
                dispatch(addIngredient(ingredient));
            }
        },
    });

    const onDeleteIngredient = useCallback((index: number) => {
        dispatch(removeIngredient(index));
    }, [dispatch]);

    const onSubmit = useCallback(() => {
        if (!user) {
            return navigate('/login')
        }
        dispatch(createOrder());
    }, [dispatch, navigate, user])

    const handlerCloseModal = useCallback(() => {
        dispatch(resetBurgerConstructor());
        dispatch(resetOrder());
    }, [dispatch]);
    
    const onSortIngredient = (dragIndex: number, hoverIndex: number) => {
        dispatch(sortIngredient({dragIndex, hoverIndex}));
    }

    const warningText = <span className={bun?"":"text_type_main-large"} style={{margin: '0 auto', maxWidth: '400px', textAlign: 'center'}}>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</span>
    return (
    <>
        <div className={`d-flex flex-column ${styles.constructorWrapper}`} ref={drop}>
            <section className={styles.constructorList}>
                {!bun && !selectedIngredients.length? (
                    warningText 
                ) : (
                    <>
                        <div className='pl-15'>
                            {bun && 
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={`${bun?.name} (верх)`}
                                    price={bun?.price}
                                    thumbnail={bun?.image}
                                    />
                            }
                        </div>
                        {!selectedIngredients.length? (
                            warningText
                        ): ( 
                            <div className={`custom-scroll ${styles.constructorScroll}`}>
                                <div className={`pl-15 ${styles.constructorList}`}>
                                    {selectedIngredients.map((item, index) => {
                                        return <DraggableIngredient key={item.uuid} index={index} name={item.name} price={item.price} image={item.image} onDrop={onSortIngredient} onDeleteIngredient={onDeleteIngredient}/>
                                    })}
                                </div>
                            </div>
                        )}
                        <div className='pl-15'>
                            {bun &&
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={`${bun?.name} (низ)`}
                                    price={bun?.price}
                                    thumbnail={bun?.image}
                                    />
                            }
                        </div>
                    </>
                )} 
            </section>
            <div className="d-flex align-items-center mr-4 justify-content-end">
                <span className="text text_type_digits-medium mr-10">{totalCoast} <CurrencyIcon type={"secondary"}/></span>
                <Button htmlType='submit' onClick={onSubmit} disabled={!bun || !selectedIngredients.length}>
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