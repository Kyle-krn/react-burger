import styles from './errorServer.module.css';

const ErrorServerPage = () => {
    return (
        <div className={styles.errorWrapper}>
            <div className={styles.error}>ERROR</div>
            <div className={styles.errorNum}>500
            <div className={styles.errorNum__clip}>500</div>
            </div>
            <p className={styles.desc}>Похоже у нас проблемы...</p>
            <p>Но мы уже получили сигнал и чиним 🔧</p>
        </div>
    )
}

export default ErrorServerPage;