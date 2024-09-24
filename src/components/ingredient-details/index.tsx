import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.css';
import { useEffect } from 'react';
import { useAppSelector } from '../../services';

    const IngredientDetails = () => {
        const { id } = useParams();
        const navigate = useNavigate();
        const ingredient  = useAppSelector(state => state.ingredients.ingredients.find(ingredient => ingredient._id === id))
        useEffect(() => {
            if (!ingredient) {
                navigate('/404')
            } 
        }, [ingredient, navigate])
        return (
            <div className={styles.detail}>
                <img className={styles.image} src={ingredient?.image} alt={ingredient?.name}/>
                <span className={`text_type_main-medium text-align-center mt-4 mb-8 ${styles.title}`}>{ingredient?.name}</span>
                <div className={`d-flex ${styles.info}`}>
                    <div className={styles.infoItem}>
                        <span>Калории,ккал</span>
                        <span className='text_type_digits-default'>{ingredient?.calories}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span>Белки, г</span>
                        <span className='text_type_digits-default'>{ingredient?.proteins}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span>Жиры, г</span>
                        <span className='text_type_digits-default'>{ingredient?.fat}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span>Углеводы, г</span>
                        <span className='text_type_digits-default'>{ingredient?.carbohydrates}</span>
                    </div>
                </div>
            </div>
        )
    }


export default IngredientDetails;