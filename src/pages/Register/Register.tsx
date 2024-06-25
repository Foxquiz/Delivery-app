import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { HeaderTitle } from '../../components/HeaderTitle/HeaderTitle'
import Input from '../../components/Input/Input'
import styles from './Register.module.css'
import { FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { register, userActions } from '../../store/user.slice'

export type RegisterForm = {
    email: {
        value: string
    }
    password: {
        value: string
    }
    name: {
        value: string
    }
}

export function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);


    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate])

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError());
        const target = e.target as typeof e.target & RegisterForm;
        const { email, password, name } = target;
        console.log(email.value, password.value, name.value);
        dispatch(register({ email: email.value, password: password.value, name: name.value }));
    };

    return (
        <div className={styles.box}>
            <HeaderTitle className={styles.title}>Регистрация</HeaderTitle>
            <form className={styles.form} id="register" onSubmit={submit}>
                <div className={styles.field}>
                    <label className={styles.label}>
                        Ваш email
                    </label>
                    <Input id="email" name="email" placeholder="Email" type="email" />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>
                        Ваш пароль
                    </label>
                    <Input id="password" name="password" placeholder="Пароль" type="password" />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>
                        Ваше имя
                    </label>
                    <Input id="name" name="name" placeholder="Имя" type="text" />
                </div>
                {registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
                <Button appearance="big" className={styles['register-btn']}>Зарегистрироваться</Button>
            </form>
            <div className={styles.link}>
                <p className={styles.text}>Есть акканут?</p>
                <Link to={'/auth/login'} className={styles['login-link']}>Войти</Link>
            </div>
        </div>
    )
}