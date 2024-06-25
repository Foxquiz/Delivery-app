import SearchInput from "../../components/SearchInput/SearchInput";
import { HeaderTitle } from "../../components/HeaderTitle/HeaderTitle";
import styles from './Menu.module.css'
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

export interface Search extends HTMLInputElement {
    value: string;
}

export function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [filter, setFilter] = useState<string>();

    useEffect(() => {
        getMenu(filter);
    }, [filter])

    const getMenu = async (searchString?: string) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
                params: {
                    name: searchString
                }
            });
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

    const search = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }

    return (
        <>
            <header className={styles['header']}>
                <HeaderTitle>Меню</HeaderTitle>
                <SearchInput name='search' placeholder="Введите блюдо или состав" onChange={search} />
            </header>
            <div className={styles['content']}>
                {error && <>{error}</>}
                {!isLoading && products.length>0 && <MenuList products={products} />}
                {isLoading && <>Loading products...</>}
                {!isLoading && products.length===0 && <>По вашему запросу ничего не найдено, попробуйте изменить запрос.</>}

            </div>
        </>
    )
}

export default Menu;