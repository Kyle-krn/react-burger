import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';

const RegisterPage = () => {
    const [form, setForm] = useState({
        'name': '',
        'email': '',
        'password': '',
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
            <h1 className='text_type_main-medium'>Регистрация</h1>
            <Input 
                type='text'
                placeholder={'Имя'}
                onChange={e => onChange(e.target.name, e.target.value)}
                value={form.name}
                name='name'
                extraClass='block-center mt-6'
            />
            <Input 
                type='email'
                placeholder={'E-mail'}
                onChange={e => onChange(e.target.name, e.target.value)}
                value={form.email}
                name='email'
                extraClass='block-center mt-6'
            />
            <Input 
                type={form.showPassword? 'text': 'password'}
                placeholder='Пароль'
                onChange={e => onChange(e.target.name, e.target.value)}
                value={form.password}
                name='password'
                extraClass='block-center mt-6'
                icon={form.showPassword? 'HideIcon': 'ShowIcon'}
                onIconClick={onClickIcon}
                size={'default'}
            />
            <Button 
                htmlType="submit" 
                type="primary" 
                size="medium"
                extraClass='mt-6'
            >
                Зарегистрироваться
            </Button>
            <p className='text_color_inactive mt-20'>
                Уже зарегестрированы? 
                <Link to='/login'> Войти</Link>
            </p>
        </div>
    )
}

export default RegisterPage;

