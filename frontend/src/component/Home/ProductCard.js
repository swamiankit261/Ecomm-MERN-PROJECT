import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material';

const productCard = ({ product }) => {
    const options = {
        value: product.ratings,
        precision: .5,
        readOnly: true
    };
    const { name, images, price, _id, numOfReviews } = product
    return (
        <>
            <Link className='productCard' to={`/product/${_id}`}>
                <img src={images?.[0]?.url} alt={name} />
                <p>{name}</p>
                <div>
                    <Rating {...options} /> <span className='productCardSpan'>({numOfReviews} Reviews)</span>
                </div>
                <span>{`₹ ${price}`}</span>
            </Link>
        </>
    )
}

export default productCard