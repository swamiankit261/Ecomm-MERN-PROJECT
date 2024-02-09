import React, { useEffect, useState } from 'react';
import "./ProcessOrder.css"
import Metadata from '../layout/Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderActions';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import { MdAccountTree } from 'react-icons/md';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';

const ProcessOrder = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();

    const [orderStatus, setOrderStatus] = useState('');

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", orderStatus);

        dispatch(updateOrder(id, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Order updated successfully");
            navigate("/admin/dashboard");
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [error, alert, dispatch, id, isUpdated, updateError, navigate]);

    return (
        <>
            <Metadata title={"Process Order"} />
            <div className='dashbord'>
                <Sidebar />
                <div className='newProductContainer'>
                    {loading ? <Loader /> : <>
                        <div className='confirmOrderContainer' style={{ display: order.orderStatus === "Delivered" ? "block" : "grid" }}>
                            <div>
                                <div className='confirmShippingArea'>
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
                                            <span>{order && order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}</span>
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
                                {/* <div className='confirmCartItems'>
                                    <Typography>Your Cart Items:</Typography>
                                    <div className='confirmCartItemsContainer'>
                                        {order.orderItems && order.orderItems.map((item) => (
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
                                </div> */}
                            </div>
                            <div style={{ display: order.orderStatus === "Delivered" ? "none" : "block" }}>
                                <form className='updateOrderForm' encType='multipart/form-data' onSubmit={updateOrderSubmitHandler}>
                                    <h1>Process Order</h1>

                                    <div>
                                        <MdAccountTree />
                                        <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                                            <option value="">Choose OrderStatus</option>
                                            {order.orderStatus === "processing" && <option value="Shipped">Shipped</option>}
                                            {order.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}

                                        </select>
                                    </div>
                                    <Button id='createProductBtn' type='submit' disabled={loading ? true : false || orderStatus === "" ? true : false}>
                                        Update Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </>
    )
}


export default ProcessOrder;