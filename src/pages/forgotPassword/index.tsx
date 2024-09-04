import React, { ChangeEvent, FormEvent } from 'react'
import { forgotPassword } from '../../services/user'
import useForm from '../../hooks/useForm'
import useAuthNavigation from '../../hooks/useAuthNavigation'
import AuthForm from '../../components/auth-form'
import { useAppDispatch } from '../../services'
import { InputType } from '../../components/auth-form/types'

const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    useAuthNavigation(true)

    const {form, handleChange} = useForm({
        'email': '',
        'showPassword': false,
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(forgotPassword(form))
    }

    const inputs: InputType[] = [
        {type: 'email', placeholder: 'E-mail', name: 'email', value: form.email, extraClass: 'block-center mt-6', onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.name as keyof typeof form, e.target.value)},
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

