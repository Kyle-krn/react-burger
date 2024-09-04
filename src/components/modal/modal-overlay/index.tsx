import { FC } from 'react';
import styles from './styles.module.css';
import { ModalOverlayType } from './types';

const ModalOverlay: FC<ModalOverlayType> = ({onClose}) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose} />
    );
}

export default ModalOverlay;