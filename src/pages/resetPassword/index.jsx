import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, resetRequest } from '../../services/user';
import useForm from '../../hooks/useForm';
import useAuthNavigation from '../../hooks/useAuthNavigation';
import AuthForm from '../../components/auth-form';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { state } = location;
    const { isRequestSuccess } = useSelector(state => state.auth)
    useEffect(() => {
        console.log(isRequestSuccess)
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

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword(form));
    }

    const inputs = [
        {
            type: 'text',
            placeholder: 'Введите код из письма',
            onChange: e => handleChange(e.target.name, e.target.value),
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
            onChange: e => handleChange(e.target.name, e.target.value),
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

