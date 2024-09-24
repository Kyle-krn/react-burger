import FeedList from '../../components/feed-list'
import FeedStat from '../../components/feed-stat'
import styles from './styles.module.css'
const FeedPage = () => {
    
    return (
        
        <>
            <h1 className="text-align-l mt-10 mb-5 text_type_main-large">Лента заказов</h1>
            <div className={styles.wrapper}>
                <FeedList />
                <FeedStat />
            </div>
        </>
    )
}

export default FeedPage