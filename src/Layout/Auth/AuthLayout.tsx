import { Outlet } from 'react-router-dom'
import styles from './AuthLayout.module.css'

export function AuthLayout() {
    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <img src="/logo.png" alt="Logo" />
            </div>
            <div className={styles['content-box']}>
                <Outlet />
            </div>
        </div>
    )
}