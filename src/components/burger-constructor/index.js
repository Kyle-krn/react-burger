import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css'
import { useState } from 'react';
import Modal from '../modal';
import OrderDetails from '../order-details';

const BurgerConstructor = ({ingredientData}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handlerOpenModal = () => {
        setIsOpen(true);
    }

    const handlerCloseModal = () => {
        setIsOpen(false);
    };

    return (
    <>
        <div className={`d-flex flex-column ${styles.constructorWrapper}`}>
            <section className={styles.constructorList}>
                <div className='pl-15'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={ingredientData[0].name}
                        price={ingredientData[0].price}
                        thumbnail={ingredientData[0].image}
                        />
                </div>
                <div className={`custom-scroll ${styles.constructorScroll}`}>
                    <div className={`pl-15 ${styles.constructorList}`}>
                        {ingredientData.slice(1).map((item, index) => 
                                <ConstructorElement
                                    key={item._id}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                    />
                                    
                                )}
                    </div>
                </div>
                <div className='pl-15'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={ingredientData[0].name}
                        price={ingredientData[0].price}
                        thumbnail={ingredientData[0].image}
                        />
                </div>
            </section>
            <div className="d-flex align-items-center mr-4 justify-content-end">
                <span className="text text_type_digits-medium mr-10">610 <CurrencyIcon/></span>
                <Button htmlType='submit' onClick={handlerOpenModal}>
                    Оформить заказ
                </Button>
            </div>
        </div>
        {isOpen && (
            <Modal onClose={handlerCloseModal}>
                <OrderDetails orderId={235353}/>
            </Modal>
        )}
    </>
    );
}

BurgerConstructor.propTypes = {
    ingredientData: PropTypes.arrayOf(PropTypes.object),
}

export default BurgerConstructor;