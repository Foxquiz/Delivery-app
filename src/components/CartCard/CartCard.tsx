import { useDispatch } from 'react-redux';
import { CartCardProps } from './CartCard.props';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import clsx from 'clsx';
import styles from './CartCard.module.css'

export function CartCard(props: CartCardProps) {
    const dispatch = useDispatch<AppDispatch>();

    const addItem = () => {
        dispatch(cartActions.add(props.id));
    }

    const removeItem = () => {
        dispatch(cartActions.remove(props.id));
    }

    const deleteItem = () => {
        dispatch(cartActions.delete(props.id));
    }

    return (
        <li className={styles.item}>
            <img alt={props.name} src={props.image} className={styles.img} />
            <div className={styles['description-box']}>
                <h2 className={styles.title}>
                    {props.name}
                </h2>
                <p className={styles.cost}>
                    {props.price}&nbsp;₽
                </p>
            </div>
            <div className={styles['count-box']}>
                <button className={clsx(styles['button'], styles['button-descrease'])} onClick={removeItem}>
                    <img src='public/cart-btn-descrease.svg' alt='Удалить из корзины' />
                </button>
                <p className={styles.counter}>{props.count}</p>
                <button className={clsx(styles['button'], styles['button-increase'])} onClick={addItem}>
                    <img src='public/cart-btn-increase.svg' alt='Добавить в корзину' />
                </button>
                <button className={clsx(styles['button'], styles['button-remove'])} onClick={deleteItem}>
                    <img src='public/cart-btn-remove.svg' alt='Удалить позицию' />
                </button>
            </div>
        </li>
    )
}