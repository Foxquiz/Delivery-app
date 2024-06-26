import { Await, useLoaderData } from "react-router-dom"
import { Product as ProductType } from "../../interfaces/product.interface";
import { Suspense } from "react";
import { ProductItem } from "./ProductItem/ProductItem";


export function Product() {
    const data = useLoaderData() as { data: ProductType };


    return (
        <Suspense fallback={<>Loading product...</>}>
            <Await
                resolve={data.data}
            >
                {({ data }: { data: ProductType }) => (
                    <ProductItem data={data}/>
                )}
            </Await>
        </Suspense>
    )
}