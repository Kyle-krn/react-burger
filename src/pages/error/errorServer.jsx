import styles from './errorServer.module.css';

const ErrorServerPage = ({ statusCode, errorText }) => {
    return (
        <div className={styles.errorWrapper}>
            <div className={styles.error}>ERROR</div>
            <div className={styles.errorNum}>
                {statusCode}
                <div className={styles.errorNum__clip}>{statusCode}</div>
            </div>
            <p className={styles.desc}>Похоже у нас проблемы...</p>
            <p>{errorText}</p>
        </div>
    );
};

export default ErrorServerPage;