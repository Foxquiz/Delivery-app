import { useDispatch, useSelector } from "react-redux";
import { HeaderTitle } from "../../components/HeaderTitle/HeaderTitle";
import { AppDispatch, RootState } from "../../store/store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interface";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../helpers/API";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";
import { CartCard } from "../../components/CartCard/CartCard";
import styles from './Cart.module.css'

const DELIVERY_COST = 169;

export function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [onlineEvent, setOnlineEvent] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getItem = async (id: number) => {
        const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    }

    const loadAllItems = async () => {
        const result = await Promise.all(items.map(item => getItem(item.id)));
        setCartProducts(result);
    }

    useEffect(() => {
        loadAllItems();
    }, [items, onlineEvent]);

    useEffect(() => {
        const handleOnline = () => {
            setOnlineEvent(true)
        }

        const handleOffline = () => {
            setOnlineEvent(false)
        }
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        }
    }, [])

    const order = async () => {
        try {
            await axios.post(`${PREFIX}/order`, {
                products: items,
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch(cartActions.clean());
            navigate('/success');
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.request) {
                    setError('Что-то пошло не так, проверьте подключение к интернету');
                    return;
                }
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }

    }

    const productsSum = items.reduce((acc, item) => {
        const product = cartProducts.find(product => product.id === item.id);
        if (!product) {
            return 0;
        }
        return acc += product.price * item.count;
    }, 0);
    
    const total = productsSum + DELIVERY_COST;

    const cartCount = items.reduce((acc, item) => acc += item.count, 0);

    return (
        <div className={styles['cart-box']}>
            <HeaderTitle className={styles['cart-title']}>Корзина</HeaderTitle>
            {error && <>{error}</>}
            {isLoading && !error && <>Загрузка корзины...</>}
            {!isLoading && items.length === 0 && !error && <>Ваша корзина пуста</>}
            {!isLoading && items.length > 0 && <ul className={clsx(styles['list-items'], styles['list-reset'])}>
                {items.map((item) => {
                    const product = cartProducts.find(product => product.id === item.id);
                    if (!product) {
                        return;
                    }
                    return (
                        <CartCard
                            key={product.id}
                            count={item.count}
                            {...product}
                        />
                    )
                })}
            </ul>}
            <ul className={clsx(styles['list-cost'], styles['list-reset'])}>
                <li className={styles['item-cost']}>
                    <h3 className={styles['cost-title']}>Итог</h3>
                    <p className={styles['cost-value']}>
                        {productsSum}
                        <span className={styles['currency']}>&nbsp;₽</span></p>
                </li>
                <li className={styles['item-cost']}>
                    <h3 className={styles['cost-title']}>Доставка</h3>
                    <p className={styles['cost-value']}>
                        {DELIVERY_COST}
                        <span className={styles['currency']}>&nbsp;₽</span></p>
                </li>
                <li className={styles['item-cost']}>
                    <h3 className={styles['cost-title']}>Итого по заказу
                        <span className={styles['items-count']}>&nbsp;&nbsp;&nbsp;({cartCount})</span>
                    </h3>
                    <p className={styles['cost-value']}>
                        {total}
                        <span className={styles['currency']}>&nbsp;₽</span></p>
                </li>
            </ul>
            <Button appearance="big" className={styles['order-btn']} onClick={order}
                disabled={items.length === 0}>оформить</Button>
        </div>
    )
}