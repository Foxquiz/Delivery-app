import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { HeaderTitle } from "../../components/HeaderTitle/HeaderTitle";
import Input from "../../components/Input/Input";
import styles from './Login.module.css'
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { login, userActions } from "../../store/user.slice";
import { RootState } from "../../store/store";

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
};

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate])

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;

        console.log(email.value, password);
        await sendLogin(email.value, password.value)
    }

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }))
    }

    return (
        <div className={styles.box}>
            <HeaderTitle className={styles.title}>Вход</HeaderTitle>
            <form className={styles.form} id="login" onSubmit={submit}>
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
                {loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
                <Button appearance="big" className={styles['login-btn']}>Вход</Button>
            </form>
            <div className={styles.link}>
                <p className={styles.text}>Нет акканута?</p>
                <Link to={'/auth/register'} className={styles['register-link']}>Зарегистрироваться</Link>
            </div>
        </div>
    )
}