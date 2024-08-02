import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Modal from '../modal';
import OrderDetails from '../order-details';
import { addIngredient, removeIngredient, sortIngredient } from '../../services/constructor';
import { useSelector, useDispatch } from 'react-redux';
import { setBun } from '../../services/constructor';
import { useDrag, useDrop } from 'react-dnd';


const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const {bun, selectedIngredients} = useSelector(state => state.burgerConstructor);
    const allIngredients = useSelector(state => state.ingredients.ingredients);
    
    const sum = useMemo(() => (bun?.price * 2) + selectedIngredients.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price;
    }, 0), [bun,selectedIngredients]);

    const buns = useMemo(() => allIngredients.filter(item => item.type === 'bun'), [allIngredients]);
    useEffect(() => {
        if (buns.length > 0) {
            dispatch(setBun(buns[0]));
        }
    }, []);

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

    const [isOpenModal, setIsOpenModal] = useState(false);
    const handlerOpenModal = useCallback(() => {
        setIsOpenModal(true);
    }, [setIsOpenModal]);
    const handlerCloseModal = useCallback(() => {
        setIsOpenModal(false);
    }, [setIsOpenModal]);
    
    const moveCard = (dragIndex, hoverIndex) => {
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
                            return <DraggableIngredient key={index} index={index} item={item} moveCard={moveCard} onDeleteIngredient={onDeleteIngredient}/>
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
                <span className="text text_type_digits-medium mr-10">{sum} <CurrencyIcon/></span>
                <Button htmlType='submit' onClick={handlerOpenModal}>
                    Оформить заказ
                </Button>
            </div>
        </div>
        {isOpenModal && (
            <Modal onClose={handlerCloseModal}>
                <OrderDetails orderId={235353}/>
            </Modal>
        )}
    </>
    );
}

const DraggableIngredient = ({item, index, moveCard, onDeleteIngredient}) => {
    const ref = useRef();
    const [{isHover}, drop] = useDrop({
        accept: 'sortIngredient',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(draggedItem) {
            if (!ref.current) {
                return;
            }
            const dragIndex = draggedItem.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            draggedItem.index = hoverIndex;
        } 
    })
    const [{isDrag}, drag] = useDrag({
        type: 'sortIngredient',
        item : {index},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })
    drag(drop(ref));
    return (
        <div ref={ref}>
            <ConstructorElement
                extraClass={`${styles.draggable} ${isDrag? 'opacity-50' : ''} ${isHover? styles.hover: ''}`}
                key={index}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => onDeleteIngredient(index)}
            />
        </div>
    )
}

export default BurgerConstructor;