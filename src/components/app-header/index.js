import styles from './styles.module.css';
import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={`pt-4 pb-4 ${styles.headerContent}`}>
                <div className={styles.headerButtonGroup}>
                    <Button htmlType="button" type="secondary" extraClass={`p-4 mr-2 ${styles.headerButton}`}>
                        <BurgerIcon type="primary"/>
                        <p className="text text_type_main-default ml-2">Конструктор</p>
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
                    <p className="text text_type_main-default ml-2">Личный кабинет</p>
                </Button>
            </div>
        </header>
    )
}

export default Header;