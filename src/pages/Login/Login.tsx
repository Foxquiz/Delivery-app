import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { HeaderTitle } from "../../components/HeaderTitle/HeaderTitle";
import Input from "../../components/Input/Input";
import styles from './Login.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { login, userActions } from "../../store/user.slice";
import { RootState } from "../../store/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

const LoginSchema = z.object({
    email: z.string().email('Некорректный формат электронной почты'),
    password: z.string().min(3, 'Пароль должен содержать не менее 3 символов')
});

type LoginForm = z.infer<typeof LoginSchema>;

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(LoginSchema)
    });

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate])

    const submit = async ({ email, password }: LoginForm) => {
        if (!errors.email && !errors.password) {
            dispatch(userActions.clearLoginError());
            await sendLogin(email, password)
        }
    }
    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }))
    }

    return (
        <div className={styles.box}>
            <HeaderTitle className={styles.title}>Вход</HeaderTitle>
            <form className={styles.form} id="login" onSubmit={handleSubmit(data => submit(data))}>
                <div className={styles.field}>
                    <label className={styles.label}>
                        Ваш email
                    </label>
                    <Input id="email" placeholder="Email" {...register('email')} />
                    {errors.email?.message && <span className={styles.error}>{errors.email?.message}</span>}
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>
                        Ваш пароль
                    </label>
                    <Input id="password" placeholder="Пароль" type="password" {...register('password')} />
                    {errors.password?.message && <span className={styles.error}>{errors.password?.message}</span>}
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
