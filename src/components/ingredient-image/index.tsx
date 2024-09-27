import { FC } from 'react'
import styles from './styles.module.css'

export type TIngredientImage = {
    zIndex?: number,
    img: string,
    count?: number
}

const IngredientImage: FC<TIngredientImage> = ({zIndex = 0, img, count = 0}) => {
    return (
        <div className={`${styles.image}`} style={{ zIndex: zIndex }}>
            
            {count? (
                <>
                    <img className={styles.extraImg} style={{zIndex: -1}} src={img} alt={`icon-6`} />
                    <span className={styles.extraCount} style={{zIndex: 0}}>+{count}</span>
                </>)
                : 
                <img src={img} alt={`icon-${zIndex}`} />
            }
        </div>
    )
}



export default IngredientImage;