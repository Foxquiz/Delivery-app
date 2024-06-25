import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from './Layout.module.css'
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userActions } from "../../store/user.slice";

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const logout = () => {
        dispatch(userActions.logout())
        navigate('/auth/login');
    }

    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <div className={styles['client']}>
                    <img className={styles['avatar']} src='public/avatar.jpg' alt='Аватар пользователя' />
                    <p className={styles['client-name']}>Мистер Фокс</p>
                    <p className={styles['client-email']}>fantastic@fox.ru</p>
                </div>
                <nav className={styles['menu']}>
                    <NavLink className={({ isActive }) => clsx(styles['link'], styles['menu-icon'],
                        { [styles.active]: isActive }
                    )} to='/'>Меню</NavLink>
                    <NavLink className={({ isActive }) => clsx(styles['link'], styles['cart-icon'],
                        { [styles.active]: isActive })} to='/cart'>Корзина</NavLink>
                </nav>
                <Button className={styles['exit']} onClick={logout}>
                    <img className={styles['exit-icon']} src='public/exit-icon.svg' alt='Exit' />
                    Выйти
                </Button>
            </div>
            <div className={styles['content-box']}>
                <Outlet />
            </div>
        </div>
    )
}