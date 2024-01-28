import React from 'react';
import "./CartItemCard.css"
import { Link } from 'react-router-dom';
import { removeItemsFromCart } from '../../actions/cartActions';
import { useDispatch } from 'react-redux';

const CartItemCard = ({ item }) => {

    const dispatch = useDispatch();
    return (
        <>
            <div className='cartItemCard'>
                <img src={item.image} alt="ProductImage" />
                <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>{`Price: ₹${item.price}`}</span>
                    <p onClick={() => dispatch(removeItemsFromCart(item.product))}>Remove</p>
                </div>
            </div>
        </>
    )
}

export default CartItemCard