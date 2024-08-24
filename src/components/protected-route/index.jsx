import PropTypes from 'prop-types';
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRouteElement = ({element}) => {
    const { user, isLoadingUser } = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoadingUser && !user.email) {
            navigate('/login')
        }
    }, [user, navigate, isLoadingUser])

    return !isLoadingUser && user.email ? element : null;
}

ProtectedRouteElement.propTypes = {
    element: PropTypes.element.isRequired,
}

export default ProtectedRouteElement;