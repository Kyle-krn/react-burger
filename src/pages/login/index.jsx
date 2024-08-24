import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/user';
import useForm from '../../hooks/useForm';
import useAuthNavigation from '../../hooks/useAuthNavigation';
import AuthForm from '../../components/auth-form';

const LoginPage = () => {
    const dispatch = useDispatch();
    console.log('login page')
    useAuthNavigation();

    const {form, handleChange, togglePasswordVisibility} = useForm({
        'name': '',
        'email': '',
        'password': '',
        'showPassword': false,
    })

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(loginUser(form))
    }

    const inputs = [
        {type: 'email', placeholder: 'E-mail', name: 'email', value: form.email, extraClass: 'block-center mt-6', onChange: e => handleChange(e.target.name, e.target.value)},
        {
            type: form.showPassword? 'text': 'password', 
            placeholder: 'Пароль', 
            name: 'password', 
            value: form.password, 
            extraClass: 'block-center mt-6', 
            icon: form.showPassword? 'HideIcon': 'ShowIcon',  
            onChange: e => handleChange(e.target.name, e.target.value),
            onIconClick: togglePasswordVisibility,
            size: 'default'
        },
    ]

    const links = [
        {description: 'Вы - новый пользователь? ', hrefText: 'Зарегистрироваться', href: '/register'},
        {description: 'Забыли пароль? ', hrefText: 'Востановить пароль', href: '/forgot-password'},
    ]

    return (
        <AuthForm 
            title='Вход'
            btnText='Войти'
            inputs={inputs}
            links={links}
            handleSubmit={handleSubmit}
        />
    )
}

export default LoginPage;