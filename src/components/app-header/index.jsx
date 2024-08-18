import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={`pt-4 pb-4 ${styles.headerContent}`}>
                <div className={styles.headerButtonGroup}>
                    <Button htmlType="button" type="secondary" extraClass={`p-4 mr-2 ${styles.headerButton}`}>
                        <BurgerIcon type="primary"/>
                        <Link className="text text_type_main-default ml-2" to='/'>Конструктор</Link>
                    </Button>
                    <Button htmlType="button" type="secondary" extraClass={`p-4 ${styles.headerButton}`}>
                        <ListIcon type="primary"/>
                        <p className="text text_type_main-default ml-2">Лента заказов</p>
                    </Button>
                </div>
                <div className={styles.logo}>
                    <Logo/>                    
                </div>
                <Button htmlType="button" type="secondary" extraClass={`p-4 ${styles.headerButton}`}>
                    <ProfileIcon type="primary"/>
                    <Link className="text text_type_main-default ml-2" to='/profile'>Личный кабинет</Link>
                </Button>
            </div>
        </header>
    )
}

export default Header;