import { Await, useLoaderData } from "react-router-dom"
import { Product as ProductType } from "../../interfaces/product.interface";
import { Suspense } from "react";

export function Product() {
    const data = useLoaderData() as { data: ProductType };


    return (
        <Suspense fallback={<>Loading product...</>}>
            <Await
                resolve={data.data}
            >
                {({ data }: { data: ProductType }) => (
                    <>Product - {data.name}</>
                )}
            </Await>
        </Suspense>
    )
}