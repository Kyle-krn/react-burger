import * as ReactDOM from 'react-dom';
import ModalOverlay from './modal-overlay';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css'
import { useEffect } from 'react';

const modalRoot = document.getElementById("react-modals");

const Modal = ({title, onClose, children}) => {
    
    const handlerKeyPress = (e) => {
        if (e.code === 'Escape') {
            onClose();
        }
    }
    
    useEffect(() => {
        document.addEventListener('keydown', handlerKeyPress);
    }, [])
    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={onClose}/>
                <div className={`text text_type_main-default ${styles.modal}`}>
                    <div className='modal-header text_type_main-large d-flex align-items-center justify-content-between'>
                        {title}
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