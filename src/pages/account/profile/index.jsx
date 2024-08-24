import React, { useCallback, useEffect, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { upadteUserInfo } from "../../../services/user";

const ProfilePage = () => {
    const { user, isRequestSuccess, isRequestFailed, failedText } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: user.name,
        email: user.email,
        password: '',
    })

    const resetForm = useCallback(() => {
        setForm({
            name: user.name,
            email: user.email,
            password: '',
        })
        setDisabledField({
            name: true,
            email: true,
            password: true,
        })
    }, [user.email, user.name])
    
    useEffect(() => {
        isRequestSuccess && resetForm();
    }, [isRequestSuccess, resetForm])

    const [disabledField, setDisabledField] = useState({
        name: true,
        email: true,
        password: true,
    })

    const isChangeForm = user.name !== form.name || user.email !== form.email || form.password

    const handleChange = (field, value) => {
        setForm({...form, [field]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(upadteUserInfo(form))
    };


    const resetField = fieldName => {
        if (disabledField[fieldName]) {
            setDisabledField({...disabledField, [fieldName]: false})
        } else {
            if (fieldName === 'password') {
                setForm({...form, [fieldName]: ''})
            } else {
                setForm({...form, [fieldName]: user[fieldName]})
            }
            setDisabledField({...disabledField, [fieldName]: true})
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Input 
                type='text'
                placeholder='Имя'
                onChange={e => handleChange(e.target.name, e.target.value)}
                value={form.name}
                name='name'
                extraClass='block-center'
                icon={disabledField.name? 'EditIcon': 'CloseIcon'}
                onIconClick={e => resetField('name')}
                disabled={disabledField.name}
            />
            <Input 
                type='email'
                placeholder='E-mail'
                onChange={e => handleChange(e.target.name, e.target.value)}
                value={form.email}
                name='email'
                extraClass='block-center mt-6'
                icon={disabledField.email? 'EditIcon': 'CloseIcon'}
                onIconClick={e => resetField('email')}
                disabled={disabledField.email}
            />
            <Input 
                type='password'
                placeholder='Пароль'
                onChange={e => handleChange(e.target.name, e.target.value)}
                value={form.password}
                name='password'
                extraClass='block-center mt-6'
                icon={disabledField.password? 'EditIcon': 'CloseIcon'}
                onIconClick={e => resetField('password')}
                disabled={disabledField.password}
            />
            {
                isRequestFailed &&
                <p className='text_color_inactive mt-4 error-text'>
                    {failedText}
                </p>
            }
            {isChangeForm && 
                <div className="d-flex justify-content-end">
                <Button
                    htmlType='submit' 
                    type='secondary' 
                    size='medium'
                    extraClass='mt-6'
                    onClick={resetForm}
                >
                    Отмена
                </Button>
                <Button
                    htmlType='submit' 
                    type='primary' 
                    size='medium'
                    extraClass='mt-6'
                >
                    Сохранить
                </Button>
            </div>
            }
        </form>
    )
}

export default ProfilePage;