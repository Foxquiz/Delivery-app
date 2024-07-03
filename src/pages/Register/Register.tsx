import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { HeaderTitle } from '../../components/HeaderTitle/HeaderTitle'
import Input from '../../components/Input/Input'
import styles from './Register.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { registerUser, userActions } from '../../store/user.slice'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const RegisterSchema = z.object({
    email: z.string().email('Некорректный формат электронной почты'),
    password: z.string().min(3, 'Пароль должен содержать не менее 3 символов'),
    name: z.string().min(3, 'Имя должно содержать не менее 3 символов')
})

type RegisterForm = z.infer<typeof RegisterSchema>;

export function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);
    const {register, handleSubmit, formState: {errors} } = useForm<RegisterForm>({
        resolver: zodResolver(RegisterSchema)
    })

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate])

    const submit = async ({ email, password, name }:RegisterForm) => {
        if (!errors.email && !errors.password && !errors.name) {
            dispatch(userActions.clearRegisterError());
            dispatch(registerUser( {email, password, name} ));
        }
    };

    return (
        <div className={styles.box}>
            <HeaderTitle className={styles.title}>Регистрация</HeaderTitle>
            <form className={styles.form} id="register" onSubmit={handleSubmit(data => submit(data))}>
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
                    <Input id="password" placeholder="Пароль" {...register('password')} />
                    {errors.password?.message && <span className={styles.error}>{errors.password?.message}</span>}
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>
                        Ваше имя
                    </label>
                    <Input id="name" placeholder="Имя" {...register('name')} />
                    {errors.name?.message && <span className={styles.error}>{errors.name?.message}</span>}
                </div>
                {registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
                <Button appearance="big" className={styles['register-btn']}>Зарегистрироваться</Button>
            </form>
            <div className={styles.link}>
                <p className={styles.text}>Есть аккаунт?</p>
                <Link to={'/auth/login'} className={styles['login-link']}>Войти</Link>
            </div>
        </div>
    )
}