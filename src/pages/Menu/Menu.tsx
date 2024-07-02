import SearchInput from "../../components/SearchInput/SearchInput";
import { HeaderTitle } from "../../components/HeaderTitle/HeaderTitle";
import styles from './Menu.module.css'
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import { ChangeEvent, useEffect, useState } from "react";
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
    const [onlineEvent, setOnlineEvent] = useState<boolean>(true);

    useEffect(() => {
        getMenu(filter);
    }, [filter, onlineEvent])

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
            setError(undefined);
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
    };

    const search = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }

    return (
        <>
            <header className={styles['header']}>
                <HeaderTitle className={styles['title']}>Меню</HeaderTitle>
                <SearchInput className={styles['search']} name='search' placeholder="Введите блюдо или состав" onChange={search} />
            </header>
            <div className={styles['content']}>
                {error && <>{error}</>}
                {!isLoading && products.length > 0 && <MenuList products={products} />}
                {isLoading && !error && <>Загрузка блюд...</>}
                {!isLoading && products.length === 0 && !error && <>По вашему запросу ничего не найдено, попробуйте изменить запрос.</>}
            </div>
        </>
    )
}

export default Menu;