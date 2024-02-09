import React, { useEffect } from 'react';
import "./OrdersList.css";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { MdDelete } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { deleteOrder, getallOrders, clearErrors } from '../../actions/orderActions';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
// import Sidebar from './Sidebar';

const OrdersList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, orders } = useSelector(state => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector(state => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success("Order deleted successfully");
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getallOrders())
    }, [error, alert, dispatch, deleteError, isDeleted, navigate]);

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
            field: "actions", headerName: "Actions", type: "number", sortable: false, filterable: false, hideable: false, minWidth: 150, flex: .3
            , renderCell: (params) => (
                <strong>
                    <Link to={`/admin/order/${params.row.id}`} >
                        <FiEdit3 />
                    </Link>
                    <Button onClick={() => deleteOrderHandler(params.row.id)}><MdDelete /></Button>
                </strong>
            ),
        },
    ];

    const rows = [];

    orders && orders.forEach((items) => rows.push({ id: items._id, status: items.orderStatus, itemsQty: items.orderItems.length, amount: items.totalPrice }));
    return (
        <>
            <Metadata title={"ALL ORDERS -ADMIN"} />
            <div className='dashbord'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id='productListHeading'>ALL ORDERS</h1>
                    <DataGrid className='productListTable' rows={rows} columns={columns} autoPageSize={true} />
                </div>
            </div>
        </>
    )
}

export default OrdersList;