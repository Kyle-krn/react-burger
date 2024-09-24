import React, { ChangeEvent, FormEvent } from 'react';
import { registerUser } from '../../services/user';
import useForm from '../../hooks/useForm';
import useAuthNavigation from '../../hooks/useAuthNavigation';
import AuthForm from '../../components/auth-form';
import { useAppDispatch } from '../../services';
import { InputType } from '../../components/auth-form/types';

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    useAuthNavigation();

    const {form, handleChange, togglePasswordVisibility} = useForm({
        name: '',
        email: '',
        password: '',
        showPassword: false,
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(registerUser(form))
    }

    const inputs: InputType[] = [
        {
            type: 'text', 
            placeholder: 'Имя', 
            name: 'name', 
            value: form.name, 
            extraClass: 'block-center mt-6', 
            onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name as keyof typeof form, e.target.value)
        },
        {
            type: 'email', 
            placeholder: 'E-mail', 
            name: 'email', 
            value: form.email, 
            extraClass: 'block-center mt-6', 
            onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name as keyof typeof form, e.target.value)
        },
        {
            type: form.showPassword? 'text': 'password', 
            placeholder: 'Пароль', 
            name: 'password', 
            value: form.password, 
            extraClass: 'block-center mt-6', 
            icon: form.showPassword? 'HideIcon': 'ShowIcon',  
            onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name as keyof typeof form, e.target.value),
            onIconClick: togglePasswordVisibility,
            size: 'default'
        },
    ]

    const links = [
        {description: 'Уже зарегестрированы? ', hrefText: 'Войти', href: '/login'}
    ]


    return (
        <AuthForm 
            title='Регистрация'
            btnText='Зарегистрироваться'
            inputs={inputs}
            links={links}
            handleSubmit={handleSubmit}
        />
    )
}

export default RegisterPage;

