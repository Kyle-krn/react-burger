import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword, resetRequest } from '../../services/user';
import useForm from '../../hooks/useForm';
import useAuthNavigation from '../../hooks/useAuthNavigation';
import AuthForm from '../../components/auth-form';
import { useAppDispatch, useAppSelector } from '../../services';
import { InputType } from '../../components/auth-form/types';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { state } = location;
    const { isRequestSuccess } = useAppSelector(state => state.auth)
    useEffect(() => {
        if (isRequestSuccess) {
            dispatch(resetRequest())
            navigate('/login')
            return
        }
    }, [dispatch, isRequestSuccess, navigate])

    useAuthNavigation();

    const {form, handleChange, togglePasswordVisibility} = useForm({
        'password': '',
        'token': '',
        'showPassword': false,
    })

    useEffect(() => {
        if (!state?.isForgotPassword) {
            navigate('/');
        }
    }, [navigate, state])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPassword(form));
    }

    const inputs: InputType[] = [
        {
            type: 'text',
            placeholder: 'Введите код из письма',
            onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name as keyof typeof form, e.target.value),
            value: form.token,
            name: 'token',
            extraClass: 'block-center mt-6',
            size: 'default'
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
        {description: 'Вспомнили пароль? ', hrefText: 'Войти', href: '/login'},
    ]


    return (
        <AuthForm
            title='Восстановление пароля'
            btnText='Сохранить'
            inputs={inputs}
            links={links}
            handleSubmit={handleSubmit}
        />
    )
}

export default ResetPasswordPage;

