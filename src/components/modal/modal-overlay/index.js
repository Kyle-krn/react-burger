import styles from './styles.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({onClose}) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose} />
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func
}

export default ModalOverlay;