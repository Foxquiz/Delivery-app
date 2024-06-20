import clsx from "clsx";
import styles from '../Menu.module.css'
import { ProductCard } from "../../../components/ProductCard/ProductCard";
import { MenuListProps } from "./MenuList.props";


export function MenuList({ products }: MenuListProps) {
    return <ul className={clsx(styles['list'], styles['list-reset'])}>
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
}