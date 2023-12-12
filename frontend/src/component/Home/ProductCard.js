import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

const productCard = ({ product }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    };
    const { name, images, price, _id, numOfReviews } = product
    return (
        <>
            <Link className='productCard' to={`/product/${_id}`}>
                <img src={images?.[0]?.url} alt={name} />
                <p>{name}</p>
                <div>
                    <ReactStars {...options} /> <span>({numOfReviews} Reviews)</span>
                </div>
                <span>{`₹ ${price}`}</span>
            </Link>
        </>
    )
}

export default productCard