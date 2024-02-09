import React, { useEffect } from 'react';
import "./MyOrders.css";
import Loader from '../layout/Loader/Loader';
import Metadata from '../layout/Metadata';
import { DataGrid } from '@mui/x-data-grid';
import { getMyOrders, clearErrors } from '../../actions/orderActions';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { MdLaunch } from 'react-icons/md';

const MyOrders = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    const columns = [
        { field: 'id', headerName: "Order Id", minWidth: 150, flex: 1 },
        {
            field: 'status', headerName: 'Status',
            minWidth: 150, flex: .5,
            cellClassName: (params) => (params.row.status === "Delivered" ? "greenColor" : "redColor"),
        },
        { field: 'itemsQty', headerName: 'ItemsQty', type: "number", minWidth: 150, flex: .3 },
        { field: 'amount', headerName: 'Amount', type: "number", minWidth: 150, flex: .5 },
        {
            field: "actions",
            sortable: false,
            filterable: false,
            hideable: false,
            headerName: 'Actions',
            type: "number",
            minWidth: 150, flex: .3,
            renderCell: (params) => (
                <strong>
                    <Link to={`/order/${params.row.id}`} >
                        <MdLaunch />
                    </Link>

                </strong>
            ),
        },
    ];

    const rows = [];

    orders && orders.forEach((items) => rows.push({ id: items._id, status: items.orderStatus, itemsQty: items.orderItems.length, amount: items.totalPrice }));

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getMyOrders());
    }, [dispatch, alert, error]);
    return (
        <>
            <Metadata title={`${user.name} -Orders`} />

            {loading ? (<Loader />) : (
                <div className='myOrdersPage'>
                    <DataGrid className='myOrdersTable' rows={rows} columns={columns} columnHeader--sorted={false} />

                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                </div>
            )}
        </>
    )
}

export default MyOrders