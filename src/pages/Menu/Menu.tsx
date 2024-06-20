import SearchInput from "../../components/SearchInput/SearchInput";
import { HeaderTitle } from "../../components/HeaderTitle/HeaderTitle";
import styles from './Menu.module.css'
import { ProductList } from "../../components/ProductList/ProductList";

// const products: ProductProps[] = [
//     {
//         id: '1',
//         title: 'Наслаждение',
//         ingridients: 'Салями, руккола, помидоры, оливки',
//         raiting: 4.5,
//         cost: 300
//     },
//     {
//         id: '2',
//         title: 'Наслаждение',
//         ingridients: 'Салями, руккола, помидоры, оливки',
//         raiting: 4.5,
//         cost: 300
//     },
// ]

export function Menu() {
    return (
        <>
            <header className={styles['header']}>
                <HeaderTitle>Меню</HeaderTitle>
                <SearchInput placeholder="Введите блюдо или состав" />
            </header>
            <div className={styles['content']}>
                <ProductList />
            </div>
        </>
    )
}