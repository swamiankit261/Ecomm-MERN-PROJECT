import React, { useEffect } from 'react';
import "./OrderDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';
import Loader from '../layout/Loader/Loader';
import { getOrderDetails, clearErrors } from '../../actions/orderActions';
import { Link, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();


    const { order, error, loading } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(id));
    }, [error, alert, dispatch, id]);
    return (
        <>
            <Metadata title="Order Details" />

            {loading ? <Loader /> : <>
                <div className='orderDetailsPage'>
                    <div className='orderDetailsContainer'>
                        <Typography component="h1">Order #{order && order._id}</Typography>
                        <Typography>Shipping Info</Typography>
                        <div className='orderDetailsContainerBox'>
                            <div>
                                <p>Name:</p>
                                <span>{order.userRef && order.userRef.name}</span>
                            </div>
                            <div>
                                <p>Email:</p>
                                <span>{order.userRef && order.userRef.email}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{order.shippingInfo && order.shippingInfo.phone}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}</span>
                            </div>
                        </div>
                        <Typography>Payment</Typography>
                        <div className='orderDetailsContainerBox'>
                            <div>
                                <p className={order.PaymentInfo && order.PaymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>
                                    {order.PaymentInfo && order.PaymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                                </p>
                            </div>
                            <div>
                                <p>Amount:</p>
                                <span>{order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>
                        <Typography>Order Status</Typography>
                        <div className='orderDetailsContainerBox'>
                            <div>
                                <p className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                                    {order.orderStatus && order.orderStatus}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='orderDetailsCartItems'>
                        <Typography>Order Items:</Typography>
                        <div className='orderDetailsCartItemsContainer'>
                            {order.orderItems && order.orderItems.map((items) => (
                                <div key={items.product}>
                                    <img src={items.image} alt="Product" />
                                    <Link to={`/product/${items.product}`}>
                                        {items.name}
                                    </Link>
                                    <span>
                                        {items.quantity} x {items.price} =
                                        <b> ₹{items.price * items.quantity}</b>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </>}
        </>
    )
}

export default OrderDetails