import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css'

const BurgerConstructor = ({IngredientData}) => {
    return (
    <div className={`d-flex flex-column ${styles.constructorWrapper}`}>
        <section className={styles.constructorList}>
            <div className='pl-15'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={IngredientData[0].name}
                    price={IngredientData[0].price}
                    thumbnail={IngredientData[0].image}
                    />
            </div>
            <div className={`custom-scroll ${styles.constructorScroll}`}>
                <div className={`pl-15 ${styles.constructorList}`}>
                    {IngredientData.slice(1).map((item, index) => 
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
                    text={IngredientData[0].name}
                    price={IngredientData[0].price}
                    thumbnail={IngredientData[0].image}
                    />
            </div>
        </section>
        <div className="d-flex align-items-center mr-4 justify-content-end">
            <span className="text text_type_digits-medium mr-10">610 <CurrencyIcon/></span>
            <Button>
                Оформить заказ
            </Button>
        </div>
    </div>
    );
}

BurgerConstructor.propTypes = {
    IngredientData: PropTypes.arrayOf(PropTypes.object),
}

export default BurgerConstructor;