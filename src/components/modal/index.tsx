import * as ReactDOM from 'react-dom';
import ModalOverlay from './modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { FC, useCallback, useEffect } from 'react';
import { ModalType } from './types';

const modalRoot = document.getElementById("react-modals");

const Modal: FC<ModalType> = ({title, onClose, children, extraClassName = 'text_type_main-large'}) => {
    
    const handlerKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.code === 'Escape') {
            onClose();
        }
    }, [onClose]);
    
    useEffect(() => {
        document.addEventListener('keydown', handlerKeyPress);
        
        return () => {
            document.removeEventListener('keydown', handlerKeyPress);
        }
    }, [handlerKeyPress]);
    if (!modalRoot) {
        return <></>
    }
    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={onClose}/>
                <div className={`text text_type_main-default ${styles.modal}`}>
                    <div className={`modal-header d-flex align-items-center justify-content-between ${title? 'pt-10' : 'pt-15'}`}>
                        <span className={extraClassName}>{title}</span>
                        <button className={styles.closeBtn} onClick={onClose}><CloseIcon type="primary" /></button>
                    </div>
                    <div className='modal-body'>{children}</div>
                </div>
            </>
        ),
        modalRoot
    )
}

export default Modal;