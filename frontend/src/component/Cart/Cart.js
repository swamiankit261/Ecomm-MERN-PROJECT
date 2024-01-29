import React from 'react';
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart } from '../../actions/cartActions.js';
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity + 1
        if (stock < newQuantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQuantity))
    };
    const decreaseQuantity = (id, quantity) => {
        const newQuantity = quantity - 1
        if (0 >= newQuantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQuantity))
    };

    const checkOutHandler = () => {
        navigate("/login?redirect=shipping");
    };
    return (
        <>
            {cartItems.length === 0 ? (
                <div className='emptyCart'>
                    <h3>Cart is empty</h3>
                    <MdRemoveShoppingCart />
                    <Link to={"/products"}>Continue Shopping</Link>
                </div>
            ) : (
                <>
                    <div className='cartPage'>
                        <div className='cartHeader'>
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                        {cartItems && cartItems.map((item) => {
                            return <div className='cartContainer' key={item.product}>
                                <CartItemCard item={item} />
                                <div className='cardInput'>
                                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                </div>
                                <p className='cartSubTotal'>{`₹${item.price * item.quantity}`}</p>
                            </div>
                        })}
                        <div className='cartGrossTotal'>
                            <div></div>
                            <div className='cartGrossTotalBox'>
                                <p>Gross Total</p>
                                <p>{`₹${cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0)}`}</p>
                            </div>
                            <div></div>
                            <div className='checkOutBtn'>
                                <button onClick={checkOutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </>)}
        </>
    )
}

export default Cart