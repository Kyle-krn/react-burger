import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const AuthForm = ({title, btnText, handleSubmit, inputs, links}) => {
    const {
        isRequestStart, 
        isRequestFailed, 
        failedText,
    } = useSelector(state => state.auth);
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className='text_type_main-medium'>{title}</h1>
            {inputs.map((input, index) => ( 
                <Input key={index} {...input}/>
            ))}
            {
                isRequestFailed &&
                <p className='text_color_inactive mt-4 error-text'>
                    {failedText}
                </p>
            }
            <Button 
                htmlType='submit' 
                type='primary' 
                size='medium'
                extraClass='mt-6'
                disabled={isRequestStart}
            >
                {btnText}
            </Button>
            <div className='text_color_inactive mt-20'>
            
                {links.map((item, index) => (
                    <p className='mb-4' key={index}>
                        {item.description} 
                        <Link to={item.href}> {item.hrefText}</Link>
                    </p>
                ))}
                    
            </div>
        </form>
    )
}

const inputPropTypes = PropTypes.shape({
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    extraClass: PropTypes.string,
    icon: PropTypes.oneOf(['HideIcon', 'ShowIcon']),
    onChange: PropTypes.func.isRequired,
    onIconClick: PropTypes.func,
    size: PropTypes.string,
});

const linkPropTypes = PropTypes.shape({
    description: PropTypes.string.isRequired,
    hrefText: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
});

AuthForm.propTypes = {
    title: PropTypes.string.isRequired,
    btnText: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    inputs: PropTypes.arrayOf(inputPropTypes).isRequired,
    links: PropTypes.arrayOf(linkPropTypes).isRequired,
}

export default AuthForm;