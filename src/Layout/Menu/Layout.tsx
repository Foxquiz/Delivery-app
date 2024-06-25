import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from './Layout.module.css'
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((s: RootState) => s.user.profile);
    const logout = () => {
        dispatch(userActions.logout())
        navigate('/auth/login');
    }

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch])

    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <div className={styles['client']}>
                    <img className={styles['avatar']} src='public/avatar.jpg' alt='Аватар пользователя' />
                    <p className={styles['client-name']}>{profile?.name}</p>
                    <p className={styles['client-email']}>{profile?.email}</p>
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