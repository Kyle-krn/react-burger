import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';

const ResetPasswordPage = () => {
    const [form, setForm] = useState({
        'password': '',
        'code': '',
        'showPassword': false,
    })

    const onChange = (field, value) => {
        setForm({...form, [field]: value})
    }
    const onClickIcon = () => {
        setForm({...form, showPassword: !form.showPassword})
    }
    return (
        <div className={styles.form}>
            <h1 className='text_type_main-medium'>Восстановление пароля</h1>
            <Input 
                type={form.showPassword? 'text': 'password'}
                placeholder='Введите новый пароль'
                onChange={e => onChange(e.target.name, e.target.value)}
                value={form.password}
                name='password'
                extraClass='block-center mt-6'
                icon={form.showPassword? 'HideIcon': 'ShowIcon'}
                onIconClick={onClickIcon}
                size={'default'}
            />
            <Input 
                type='text'
                placeholder='Введите код из письма'
                onChange={e => onChange(e.target.name, e.target.value)}
                value={form.code}
                name='code'
                extraClass='block-center mt-6'
                size={'default'}
            />
            <Button 
                htmlType="submit" 
                type="primary" 
                size="medium"
                extraClass='mt-6'
            >
                Сохранить
            </Button>
            <p className='text_color_inactive mt-20'>
                Вспомнили пароль? 
                <Link to='/login'> Войти</Link>
            </p>
        </div>
    )
}

export default ResetPasswordPage;

