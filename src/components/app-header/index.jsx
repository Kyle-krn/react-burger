import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={`pt-4 pb-4 ${styles.headerContent}`}>
                <div className={styles.headerButtonGroup}>
                    <Button htmlType="button" type="secondary" extraClass={`p-4 mr-2 ${styles.headerButton}`}>
                        <BurgerIcon type="primary"/>
                        <NavLink 
                            className={({isActive}) => isActive? `${styles.activeLink} ml-2` : 'ml-2'} 
                            to='/'
                        >
                            Конструктор
                        </NavLink>
                    </Button>
                    <Button htmlType="button" type="secondary" extraClass={`p-4 ${styles.headerButton}`}>
                        <ListIcon type="primary"/>
                        <NavLink 
                            className='ml-2'
                            to='#'
                        >
                            Лента заказов
                        </NavLink>
                    </Button>
                </div>
                <div className={styles.logo}>
                    <Logo/>                    
                </div>
                <Button htmlType="button" type="secondary" extraClass={`p-4 ${styles.headerButton}`}>
                    <ProfileIcon extraClass='mr-2' type="primary"/>
                    <NavLink 
                        className={({isActive}) => isActive? `${styles.activeLink} ml-2` : 'ml-2'} 
                        to='/profile'
                    >
                        Личный кабинет
                    </NavLink>
                </Button>
            </div>
        </header>
    )
}

export default Header;