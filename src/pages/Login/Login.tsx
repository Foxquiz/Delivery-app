import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { HeaderTitle } from "../../components/HeaderTitle/HeaderTitle";
import Input from "../../components/Input/Input";
import styles from './Login.module.css'
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../helpers/API";

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
};

export function Login() {
    const [error, setError] = useState<string | null>();
    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;

        console.log(email.value, password);
        await sendLogin(email.value, password.value)
    }

    const sendLogin = async (email: string, password: string) => {
        try {

            const { data } = await axios.post(`${PREFIX}/auth/login`, {
                email,
                password
            });
            console.log(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.message);
            }
        }
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
                {error && <div className={styles.error}>{error}</div>}
                <Button appearance="big" className={styles['login-btn']}>Вход</Button>
            </form>
            <div className={styles.link}>
                <p className={styles.text}>Нет акканута?</p>
                <Link to={'/auth/register'} className={styles['register-link']}>Зарегистрироваться</Link>
            </div>
        </div>
    )
}