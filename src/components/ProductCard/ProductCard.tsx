import clsx from "clsx";
import { ProductCardProps } from "./ProductCard.props";
import styles from './ProductCard.module.css'
import { Link } from "react-router-dom";

export function ProductCard(props: ProductCardProps) {
    return (
        <Link to={`/product/${props.id}`} className={clsx(styles.card)}>
            <div className={styles.top} style={{ backgroundImage: `url(${props.image})` }}>
                <span className={clsx(styles.cost, styles.oval)}>
                    {props.price}{' '}
                    <span className={clsx(styles['cost-currency'])}>₽</span>
                </span>
                <button className={clsx(styles['button-cart'])}>
                    <img className={clsx(styles['bag-img'])} src="public/bag-icon.svg" alt="Добавление в корзину" />
                </button>
                <span className={clsx(styles.rate, styles.oval)}>
                    {props.rating}&nbsp;
                    <img src="public/star-icon.svg" alt="Иконка звезды" />
                </span>
            </div>
            <div className={styles.bottom}>
                <h2 className={styles.title}>
                    {props.name}
                </h2>
                <p className={styles.descr}>
                    {props.ingridients}
                </p>
            </div>
        </Link>
    )
}