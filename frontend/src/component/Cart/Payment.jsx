import React, { useEffect, useRef } from 'react';
import "./Payment.css";
import CheckoutSteps from './CheckoutSteps';
import Metadata from '../layout/Metadata';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Typography } from '@mui/material';
import { FaCreditCard } from "react-icons/fa6";
import { MdEventNote } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '../../actions/orderActions';

const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const alert = useAlert();
    const payBtn = useRef(null);


    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
        return_url: 'https://example.com/return_url',
        paymentMethodId: "pm_card_visa"
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post(`/api/v1/payment/process`, paymentData, config);

            const client_secret = data.client_secret;


            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        phone: shippingInfo.phone,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pincode,
                            country: shippingInfo.country,
                        }
                    }
                }
            });

            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
                console.log("result:", result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.PaymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));

                    navigation("/success");
                } else {
                    payBtn.current.disabled = false;
                    alert.error("There's a problem with your transaction");
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [error, alert, dispatch]);
    return (
        <>
            <Metadata title={"Payment"} />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <FaCreditCard />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <MdEventNote />
                        <CardCvcElement className='paymentInput' />
                    </div>
                    <div>
                        <MdVpnKey />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <button className='paymentButton' value={`pay- ₹${orderInfo.totalPrice}`} type="submit" ref={payBtn}>{`pay-₹${orderInfo.totalPrice}`}</button>
                </form>
            </div>
        </>
    )
}

export default Payment