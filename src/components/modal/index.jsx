import * as ReactDOM from 'react-dom';
import ModalOverlay from './modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

const Modal = ({title, onClose, children}) => {
    
    const handlerKeyPress = useCallback((e) => {
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
    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={onClose}/>
                <div className={`text text_type_main-default ${styles.modal}`}>
                    <div className={`modal-header d-flex align-items-center justify-content-between ${title? 'pt-10' : 'pt-15'}`}>
                        <span className='text_type_main-large'>{title}</span>
                        <button className={styles.closeBtn} onClick={onClose}><CloseIcon type="primary" /></button>
                    </div>
                    <div className='modal-body'>{children}</div>
                </div>
            </>
        ),
        modalRoot
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
}

export default Modal;