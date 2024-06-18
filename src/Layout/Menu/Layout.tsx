import { Link, Outlet } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from './Layout.module.css'
import clsx from "clsx";

export function Layout() {
    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <div className={styles['client']}>
                    <img className={styles['avatar']} src='public/avatar.jpg' alt='Аватар пользователя' />
                    <p className={styles['client-name']}>Мистер Фокс</p>
                    <p className={styles['client-email']}>fantastic@fox.ru</p>
                </div>
                <nav className={styles['menu']}>
                    <Link className={clsx(styles['link'], styles['menu-icon'])} to='/'>Меню</Link>
                    <Link className={clsx(styles['link'], styles['cart-icon'])} to='/cart'>Корзина</Link>
                </nav>
                <Button className={styles['exit']}>
                    <img className={styles['exit-icon']} src='public/exit-icon.svg' alt='Exit' />
                    Выйти
                </Button>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}