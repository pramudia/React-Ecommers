import React from 'react'
import { CartState } from '../../Context/Context'
import SingleProduct from '../SingleProduct/SingleProduct';
import Filters from '../Filters/Filters';
import "./Home.css";
import "../Filters/Filters.css";
// import "../Login/Login.css";

const Home = () => {
    const { state: { product },
        productState: { byStock, byFastDelivery, sort, byRating, searchQuery },
    } = CartState();

    const transformProduct = () => {
        let sortedProduct = product;

        if (sort) {
            sortedProduct = sortedProduct.sort((a, b) =>
                sort === "lowToHight" ? a.price - b.price : b.price - a.price
            );
        }

        if (!byStock) {
            sortedProduct = sortedProduct.filter((prod) => prod.inStock)
        }

        if (byFastDelivery) {
            sortedProduct = sortedProduct.filter((prod) => prod.fastDelivery)
        }

        if (byRating) {
            sortedProduct = sortedProduct.filter(
                (prod) => prod.rattings >= byRating
            )
        }

        if (searchQuery) {
            sortedProduct = sortedProduct.filter((prod) =>
                prod.name.toLowerCase().includes(searchQuery)
            );
        }

        return sortedProduct;
    }
    return (
        <div className='home'>
            <Filters />
            <div className="productContainer">
                {transformProduct().map((prod) => {
                    return <SingleProduct prod={prod} key={prod.id} />
                })}
            </div>
        </div>
    )
}

export default Home