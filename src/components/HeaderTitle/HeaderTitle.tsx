import clsx from 'clsx';
import styles from './HeaderTitle.module.css';
import { HeaderTitleProps } from './HeaderTitle.props';

export function HeaderTitle({ children, className, ...props }:HeaderTitleProps) {
    return (
        <h2 className={clsx(styles['title'], className)} {...props}>{children}</h2>
    )
}