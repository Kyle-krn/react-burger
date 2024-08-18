import React, {useState} from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const LoginPage = () => {
    const [form, setForm] = useState({
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
        <div className={styles.loginForm}>
            <h1 className='text_type_main-medium'>Вход</h1>
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
                Войти
            </Button>
            <p className='text_color_inactive mt-20'>
                Вы - новый пользователь? 
                <Link to='/register'> Зарегистрироваться</Link>
            </p>
            <p className='text_color_inactive mt-4'>
                Забыли пароль? 
                <Link to='/forgot-password'> Востановить пароль</Link>
            </p>
        </div>
    )
}

export default LoginPage;