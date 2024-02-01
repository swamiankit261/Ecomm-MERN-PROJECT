import React from 'react';
import "./OrderSuccess.css"
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import Metadata from '../layout/Metadata';


const OrderSuccess = () => {
    return (
        <>
            <Metadata title={"Order Success"} />
            <div className='orderSuccess'>
                <FaCheckCircle />
                <Typography>Your order has been placed successfully</Typography>
                <Link to={`/order/me`} >View Orders</Link>
            </div>
        </>
    )
}

export default OrderSuccess