import clsx from "clsx";
import { ProductCard } from "../ProductCard/ProductCard"
import styles from './ProductList.module.css'

export function ProductList() {
    return (
        <ul className={clsx(styles['list'], styles['list-reset'])}>
            <li key={1}>
                <ProductCard
                    id='1'
                    title='Наслаждение'
                    ingridients='Салями, руккола, помидоры, оливки'
                    rating={4.5}
                    cost={300}
                    image='public/pizza-1.jpg'
                />
            </li>
        </ul>
    )
}