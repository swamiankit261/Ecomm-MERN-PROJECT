import React, { useEffect } from 'react';
import "./ProductList.css";
import { getAdminProduct, clearError } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { MdDelete } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
// import Sidebar from './Sidebar';

const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        dispatch(getAdminProduct())
    }, [error, alert, dispatch]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Product Name", minWidth: 300, flex: .5 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", minWidth: 270, flex: 0.5 },
        {
            field: "actions", headerName: "Actions", type: "number", sortable: false, filterable: false, hideable: false, minWidth: 150, flex: .3
            , renderCell: (params) => (
                <strong>
                    <Link to={`/admin/product/${params.row.id}`} >
                        <FiEdit3 />
                    </Link>
                    <Button><MdDelete /></Button>
                </strong>
            ),
        },
    ];

    const rows = [];

    products && products.forEach((items) => rows.push({ id: items._id, name: items.name, stock: items.stock, price: items.price }));
    return (
        <>
            <Metadata title={"ALL PRODUCTS -ADMIN"} />
            <div className='dashbord'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id='productListHeading'>ALL PRODUCTS</h1>
                    <DataGrid className='productListTable' rows={rows} columns={columns} autoPageSize={10} />
                </div>
            </div>
        </>
    )
}

export default ProductList