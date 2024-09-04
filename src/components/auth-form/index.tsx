import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import { FC } from 'react';
import { AuthFormProps } from './types';
import { useAppSelector } from '../../services';

const AuthForm: FC<AuthFormProps> = ({title, btnText, handleSubmit, inputs, links}) => {
    const {
        isRequestStart, 
        isRequestFailed, 
        failedText,
    } = useAppSelector(state => state.auth);
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

export default AuthForm;