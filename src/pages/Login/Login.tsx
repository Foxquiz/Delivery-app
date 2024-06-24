import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { HeaderTitle } from "../../components/HeaderTitle/HeaderTitle";
import Input from "../../components/Input/Input";
import styles from './Login.module.css'
import { FormEvent } from "react";

export function Login() {
    const submit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
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
                <Button appearance="big" className={styles['login-btn']}>Вход</Button>
            </form>
            <div className={styles.link}>
                <p className={styles.text}>Нет акканута?</p>
                <Link to={'/auth/register'} className={styles['register-link']}>Зарегистрироваться</Link>
            </div>
        </div>
    )
}