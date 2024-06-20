import SearchInput from "../../components/SearchInput/SearchInput";
import { HeaderTitle } from "../../components/HeaderTitle/HeaderTitle";
import styles from './Menu.module.css'
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

export function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();


    const getMenu = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
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
                {!isLoading && <MenuList products={products} />}
                {isLoading && <>Loading products...</>}
                {error && <>{error}</>}
            </div>
        </>
    )
}

export default Menu;