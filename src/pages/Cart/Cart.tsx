import { useDispatch, useSelector } from "react-redux";
import { HeaderTitle } from "../../components/HeaderTitle/HeaderTitle";
import { AppDispatch, RootState } from "../../store/store";
import { CartCard } from "../../components/CartCard/CartCard";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import Button from "../../components/Button/Button";
import styles from './Cart.module.css'
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

const DELIVERY_COST = 169;

export function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

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
    }, [items]);

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
        } catch (error) {
            console.log(error);
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

    return (
        <div className={styles['cart-box']}>
            <HeaderTitle>Корзина</HeaderTitle>
            <ul className={clsx(styles['list-items'], styles['list-reset'])}>
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
            </ul>
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
                        <span className={styles['items-count']}>&nbsp;&nbsp;&nbsp;({items.length})</span>
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