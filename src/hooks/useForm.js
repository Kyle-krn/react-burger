import { useState } from "react"

const useForm = (initialState) => {
    const [form, setForm] = useState(initialState);

    const handleChange = (field, value) => {
        setForm(prev => ({...prev, [field]: value}))
    }

    const togglePasswordVisibility = () => {
        setForm(prev => ({...prev, showPassword: !prev.showPassword}))
    }

    return {form, handleChange, togglePasswordVisibility, setForm}
}

export default useForm;