import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import clsx from 'clsx';

function Button({ children, className, appearance = 'small', ...props }: ButtonProps) {
	return (
		<button className={clsx(styles.button, styles.accent, className,
			{
				[styles['big']]: appearance === 'big',
				[styles['small']]: appearance === 'small'
			})}
			{...props}>{children}
		</button>
	);
}

export default Button;