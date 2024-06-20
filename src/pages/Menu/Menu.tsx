import SearchInput from "../../components/SearchInput/SearchInput";
import { HeaderTitle } from "../../components/HeaderTitle/HeaderTitle";
import styles from './Menu.module.css'
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import clsx from "clsx";

export function Menu() {
    const [products, setProducts] = useState<Product[]>([]);

    const getMenu = async (): Promise<Product[] | void> => {
        try {

            const res = await fetch(`${PREFIX}/products`);
            if (!res.ok) {
                return;
            }
            const data = await res.json() as Product[];
            setProducts(data);
        } catch (e) {
            console.error(e);
            return;
        }
    };

    useEffect(() => {
        getMenu();
    }, [])

    return (
        <>
            <header className={styles['header']}>
                <HeaderTitle>Меню</HeaderTitle>
                <SearchInput placeholder="Введите блюдо или состав" />
            </header>
            <div className={styles['content']}>
                <ul className={clsx(styles['list'], styles['list-reset'])}>
                    {products.map(p => (
                        <li key={p.id}>
                            <ProductCard
                                id={p.id}
                                name={p.name}
                                ingridients={p.ingredients.join(', ')}
                                image={p.image}
                                rating={p.rating}
                                price={p.price}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}