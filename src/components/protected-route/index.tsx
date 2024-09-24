import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from '../../services';
import { ProtectedRouteElementType } from './types';

const ProtectedRouteElement: FC<ProtectedRouteElementType> = ({element}) => {
    const { user, isLoadingUser } = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoadingUser && !user) {
            navigate('/login')
        }
    }, [user, navigate, isLoadingUser])

    return !isLoadingUser && user ? element : null;
}

export default ProtectedRouteElement;