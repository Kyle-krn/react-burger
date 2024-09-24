import React from "react";
import styles from './styles.module.css';
import { Outlet, NavLink } from "react-router-dom";
import { logoutUser } from "../../services/user";
import { useAppDispatch } from "../../services";

const AccountPage = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logoutUser())
    }
    return (
        <div className={styles.page}>
            <div className={styles.menu}>
                <ul className="text_type_main-medium mb-20">
                    <li>
                        <NavLink 
                            to=''
                            className={({isActive}) => isActive? styles.activeLink: ''}
                            end
                        >
                            Профиль
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='orders'
                            className={({isActive}) => isActive? styles.activeLink: ''}
                            end
                        >
                            История заказов
                        </NavLink>
                    </li>
                    <li>
                        <span onClick={handleLogout}>
                            Выход
                        </span>
                    </li>
                </ul>
                <span className="text_color_inactive">В этом разделе вы можете изменить свои персональные данные</span>
            </div>
            <Outlet />
        </div>
    )
}

export default AccountPage;