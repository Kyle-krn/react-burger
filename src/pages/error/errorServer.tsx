import { FC } from 'react';
import styles from './errorServer.module.css';

export type TErrorServer = {
    statusCode: string;
    errorText: string;
}

const ErrorServerPage: FC<TErrorServer> = ({ statusCode, errorText }) => {
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