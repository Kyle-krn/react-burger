import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';

const ForgotPassword = () => {
    const [form, setForm] = useState({
        'email': '',
    })

    const onChange = (field, value) => {
        setForm({...form, [field]: value})
    }
    return (
        <div className={styles.form}>
            <h1 className='text_type_main-medium'>Восстановление пароля</h1>
            <Input 
                type='email'
                placeholder={'E-mail'}
                onChange={e => onChange(e.target.name, e.target.value)}
                value={form.email}
                name='email'
                extraClass='block-center mt-6'
            />
            <Button 
                htmlType="submit" 
                type="primary" 
                size="medium"
                extraClass='mt-6'
            >
                Востановить
            </Button>
            <p className='text_color_inactive mt-20'>
                Вспомнили пароль? 
                <Link to='/login'> Войти</Link>
            </p>
        </div>
    )
}

export default ForgotPassword;

