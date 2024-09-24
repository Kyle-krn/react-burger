import { useState } from "react"

type FormState<T> = T & { showPassword?: boolean };

const useForm = <T extends object>(initialState: T) => {
    const [form, setForm] = useState<FormState<T>>(initialState as FormState<T>);

    const handleChange = (field: keyof T, value: T[keyof T]) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    const togglePasswordVisibility = () => {
        setForm(prev => ({ ...prev, showPassword: !prev.showPassword }));
    }

    return { form, handleChange, togglePasswordVisibility, setForm };
}

export default useForm;