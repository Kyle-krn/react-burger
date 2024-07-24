import styles from './styles.module.css';

const IngredientDetails = ({image, name, calories, carbohydrates, fat, proteins}) => {
    return (
        <div className={styles.detail}>
            <img className={styles.image} src={image}/>
            <span className={`text_type_main-medium text-align-center mt-4 mb-8 ${styles.title}`}>{name}</span>
            <div className={`d-flex ${styles.info}`}>
                <div className={styles.infoItem}>
                    <span>Калории,ккал</span>
                    <span className='text_type_digits-default'>{calories}</span>
                </div>
                <div className={styles.infoItem}>
                    <span>Белки, г</span>
                    <span className='text_type_digits-default'>{proteins}</span>
                </div>
                <div className={styles.infoItem}>
                    <span>Жиры, г</span>
                    <span className='text_type_digits-default'>{fat}</span>
                </div>
                <div className={styles.infoItem}>
                    <span>Углеводы, г</span>
                    <span className='text_type_digits-default'>{carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}

export default IngredientDetails;