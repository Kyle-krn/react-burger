import React, { useState } from "react";
import styles from './styles.module.css';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

const ProfilePage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })
    return (
        <form>
            <Input 
                type='text'
                placeholder={'Имя'}
                // onChange={e => onChange(e.target.name, e.target.value)}
                value={form.name}
                name='name'
                extraClass='block-center'
                icon='EditIcon'
            />
            <Input 
                type='email'
                placeholder={'E-mail'}
                // onChange={e => onChange(e.target.name, e.target.value)}
                value={form.email}
                name='email'
                extraClass='block-center mt-6'
                icon='EditIcon'
            />
            <Input 
                type='password'
                placeholder={'Пароль'}
                // onChange={e => onChange(e.target.name, e.target.value)}
                value={form.password}
                name='password'
                extraClass='block-center mt-6'
                icon='EditIcon'
            />
        </form>
    )
}

export default ProfilePage;