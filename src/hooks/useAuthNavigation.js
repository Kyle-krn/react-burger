import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { resetRequest } from "../services/user";

const useAuthNavigation = (isForgotPassword = false) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isRequestSuccess, user} = useSelector(state => state.auth)
    
    useEffect(() => {
        (isRequestSuccess || user.email) && navigate('/');
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