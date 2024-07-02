import clsx from "clsx";
import { Product as ProductType } from "../../../interfaces/product.interface";
import Button from "../../Button/Button";
import { HeaderTitle } from "../../HeaderTitle/HeaderTitle";
import styles from '../Product.module.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { cartActions } from "../../../store/cart.slice";


export function ProductItem({ data }: { data: ProductType }) {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const add = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(cartActions.add(data.id));
    }

    return (
        <div className={styles['card-box']}>
            <div className={styles['header']}>
                <button className={styles['button-nav']} onClick={() => navigate('/')}>
                    <img src="public/arrow.svg" />
                </button>
                <HeaderTitle className={styles['title']}>{data.name}</HeaderTitle>
                <Button className={styles['button-cart']} onClick={add}>В корзину</Button>
            </div>
            <div className={styles['card']}>
                <div className={styles['img-wrapper']}>
                    <img src={data.image} alt={`Продукт: ${data.name}`} className={styles['product-img']} />
                </div>
                <div className={styles['content']}>
                    <ul className={clsx(styles['list-cost'], styles['list-reset'])}>
                        <li className={styles['item-cost']}>
                            <h3 className={styles['cost-title']}>Цена</h3>
                            <p className={styles['cost-value']}>
                                {data.price}
                                <span className={styles['currency']}>&nbsp;₽</span></p>
                        </li>
                        <li className={styles['item-cost']}>
                            <h3 className={styles['cost-title']}>Рейтинг</h3>
                            <p className={styles.rate}>
                                {data.rating}&nbsp;
                                <img src="public/star-icon.svg" alt="Иконка звезды" />
                            </p>
                        </li>
                    </ul>
                    <h3 className={styles['ingridients']}>Состав:</h3>
                    <ul className={styles['list-ingredients']}>
                        {data.ingredients.map((ingridient, index) => {
                            return <li key={index} className={styles['ingridient']}>
                                {ingridient}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}