import React from 'react'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../../services/user'
import useForm from '../../hooks/useForm'
import useAuthNavigation from '../../hooks/useAuthNavigation'
import AuthForm from '../../components/auth-form'

const ForgotPassword = () => {
    const dispatch = useDispatch();
    useAuthNavigation(true)

    const {form, handleChange} = useForm({
        'email': '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(forgotPassword(form))
    }

    const inputs = [
        {type: 'email', placeholder: 'E-mail', name: 'email', value: form.email, extraClass: 'block-center mt-6', onChange: e => handleChange(e.target.name, e.target.value)},
    ]

    const links = [
        {description: 'Вспомнили пароль? ', hrefText: 'Войти', href: '/login'},
    ]

    return (
        <AuthForm
            title='Восстановление пароля'
            btnText='Восстановить'
            inputs={inputs}
            links={links}
            handleSubmit={handleSubmit}
        />
    )
}

export default ForgotPassword;

