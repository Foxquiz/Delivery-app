import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import styles from './Success.module.css'

export function Success() {
    const navigate = useNavigate();
    
    return (
        <div className={styles['success-box']}>
            <img className={styles['img']} src="/public/order-success.png" alt="Пицца" />
            <p className={styles['message']}>Ваш заказ успешно оформлен!</p>
            <Button className={styles['button']} appearance='big' onClick={() => navigate('/')}>Сделать новый</Button>
        </div>
    )
}