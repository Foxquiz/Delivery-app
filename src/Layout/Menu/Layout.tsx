import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from './Layout.module.css'
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((s: RootState) => s.user.profile);
    const items = useSelector((s: RootState) => s.cart.items);
    const sidebar = useRef<HTMLDivElement>(null);
    const [sidebarState, setSidebarState] = useState(false);

    const logout = () => {
        dispatch(userActions.logout())
        navigate('/auth/login');
    }

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch])

    const cartCount = items.reduce((acc, item) => acc += item.count, 0);

    useOnClickOutside(sidebar as React.MutableRefObject<HTMLDivElement>, () => {
        if (sidebarState) {
            setSidebarState(!sidebarState);
        }
    })

    const handleClick = () => {
        setSidebarState(!sidebarState);
    }

    useEffect(() => {
        let startTouchX = 0;
        let endTouchX = 0;
        let startTouchY = 0;
        let endTouchY = 0;

        const getStartTouch = (e: TouchEvent) => {
            startTouchX = e.changedTouches[0].pageX;
            startTouchY = e.changedTouches[0].pageY;
        }

        const getEndTouch = (e: TouchEvent) => {
            endTouchX = e.changedTouches[0].pageX;
            endTouchY = e.changedTouches[0].pageY;

            if (startTouchX < 100 &&
                Math.abs(endTouchY - startTouchY) < 40 &&
                endTouchX > startTouchX) {
                setSidebarState(true);
            }
            if (Math.abs(endTouchY - startTouchY) < 40 &&
                endTouchX < startTouchX) {
                setSidebarState(false);
            }
        }

        document.addEventListener('touchstart', getStartTouch);
        document.addEventListener('touchend', getEndTouch)

        return () => {
            document.removeEventListener('touchstart', getStartTouch);
            document.removeEventListener('touchend', getEndTouch);
        };
    }, [])


    return (
        <div className={clsx(styles.layout, styles.container)}>
            <button data-count={cartCount}
                className={clsx(styles['sidebar-open-btn'], {
                    [styles['sidebar-open-btn--close']]: sidebarState,
                })}
                onClick={handleClick}>
                <img className={styles['avatar']} src='/avatar.jpg' alt='Аватар пользователя' />
            </button>
            <div ref={sidebar} className={clsx(styles['sidebar'],
                { [styles['open-sidebar']]: sidebarState }
            )}>
                <div className={styles['client']}>
                    <img className={styles['avatar']} src='/avatar.jpg' alt='Аватар пользователя'
                        onClick={handleClick} />
                    <p className={styles['client-name']}>{profile?.name}</p>
                    <p className={styles['client-email']}>{profile?.email}</p>
                </div>
                <nav className={styles['menu']}>
                    <NavLink className={({ isActive }) => clsx(styles['link'], styles['menu-icon'],
                        { [styles.active]: isActive }
                    )} to='/'>Меню</NavLink>
                    <NavLink className={({ isActive }) => clsx(styles['link'], styles['cart-icon'],
                        { [styles.active]: isActive })} to='/cart'>Корзина
                        {Boolean(cartCount) && <span className={styles['cart-count']}>
                            {cartCount}
                        </span>}
                    </NavLink>
                </nav>
                <Button className={styles['exit']} onClick={logout}>
                    <img className={styles['exit-icon']} src='/exit-icon.svg' alt='Exit' />
                    Выйти
                </Button>
            </div>
            <div className={styles['content-box']}>
                <Outlet />
            </div>
        </div>
    )
}