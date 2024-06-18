import styles from './Input.module.css';
import clsx from 'clsx';
import { InputProps } from './Input.props';
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ isValid = true, className,...props }, ref) {

    return (
        <input ref={ref} className={clsx(styles['input'], className, {
            [styles['invalid']]: !isValid,
        })} {...props} />
    );
});

export default Input;