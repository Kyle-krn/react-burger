import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css'

const BurgerConstructor = ({IngredientData}) => {
    return (
    <div className={`max-width-600 d-flex flex-column ${styles.constructorWrapper}`}>
        <section className={styles.constructorList}>
            <div>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={IngredientData[0].name}
                    price={IngredientData[0].price}
                    thumbnail={IngredientData[0].image}
                    />
            </div>
            <div className={styles.constructorScroll}>
                <div className={styles.constructorList}>
                    {IngredientData.map((item, index) => 
                            <ConstructorElement
                                key={item._id}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                />
                                
                            )}
                </div>
            </div>
            <div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={IngredientData[0].name}
                    price={IngredientData[0].price}
                    thumbnail={IngredientData[0].image}
                    />
            </div>
        </section>
        <div className="d-flex align-items-center justify-content-end">
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