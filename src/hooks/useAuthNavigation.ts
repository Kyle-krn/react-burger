import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { resetRequest } from "../services/user";
import { useAppDispatch, useAppSelector } from "../services";

const useAuthNavigation = (isForgotPassword = false) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {isRequestSuccess, user} = useAppSelector(state => state.auth)
    
    useEffect(() => {
        (isRequestSuccess || user) && navigate('/');
        dispatch(resetRequest());
    }, [isRequestSuccess, navigate, user, dispatch])

    useEffect(() => {
        if (isForgotPassword && isRequestSuccess) {
            navigate('/reset-password', {state: {isForgotPassword: true}})
            dispatch(resetRequest())
        }
    }, [dispatch, isForgotPassword, isRequestSuccess, navigate])
}

export default useAuthNavigation;