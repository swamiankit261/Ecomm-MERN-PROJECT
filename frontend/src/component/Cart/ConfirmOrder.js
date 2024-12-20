import React from 'react'
import "./ConfirmOrder.css";
import CheckoutSteps from './CheckoutSteps';
import Metadata from '../layout/Metadata';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {

    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0);

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * .18;

    const totalPrice = subtotal + shippingCharges + tax;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data));

        navigate("/process/payment");
    }

    return (
        <>
            <Metadata title={"ConfirmOrder"} />
            <CheckoutSteps activeStep={1} />
            <div className='confirmOrderContainer'>
                <div>
                    <div className='confirmShippingArea'>
                        <Typography>Shipping Info</Typography>
                        <div className='confirmShippingAreaBox'>
                            <div>
                                <p>Name: </p>
                                <span> {user.name}</span>
                            </div>
                            <div>
                                <p>Phone: </p>
                                <span> {shippingInfo.phone}</span>
                            </div>
                            <div>
                                <p>Address: </p>
                                <span> {address}</span>
                            </div>
                        </div>
                    </div>
                    <div className='confirmCartItems'>
                        <Typography>Your Cart Items:</Typography>
                        <div className='confirmCartItemsContainer'>
                            {cartItems && cartItems.map((item) => (
                                <div key={item.product}>
                                    <img src={item.image} alt={`product`} />
                                    <Link to={`/product/${item.product}`} >{item.name}</Link>
                                    <span>
                                        {item.quantity}x{item.price}=
                                        <b>₹{item.price * item.quantity}</b>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className='orderSummary'>
                        <Typography>Order Summary</Typography>
                        <div className='orderSummaryBox'>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges</p>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{tax}</span>
                            </div>
                        </div>
                        <div className='orderSummaryTotal'>
                            <p><b>Total:</b></p>
                            <span>₹{totalPrice}</span>
                        </div>
                        <div className='orderSummaryBtn'>
                            <button onClick={proceedToPayment}>Proceed To Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder