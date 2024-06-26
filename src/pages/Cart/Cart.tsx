import { useSelector } from "react-redux";
import { HeaderTitle } from "../../components/HeaderTitle/HeaderTitle";
import { RootState } from "../../store/store";
import { CartCard } from "../../components/CartCard/CartCard";
import clsx from "clsx";
import styles from './Cart.module.css'
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";

export function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);

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

    return (
        <>
            <HeaderTitle>Корзина</HeaderTitle>
            <ul className={clsx(styles['list'], styles['list-reset'])}>
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
        </>
    )
}