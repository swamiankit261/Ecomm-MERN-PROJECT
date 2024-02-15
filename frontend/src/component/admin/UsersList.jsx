import React, { useEffect } from 'react';
import "./ProductList.css";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { MdDelete } from 'react-icons/md';
import { FiEdit3 } from 'react-icons/fi';
import { getAllUsers, clearError, deleteUser } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';
// import Sidebar from './Sidebar';

const UsersList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, users } = useSelector(state => state.allUsers);
    const { error: deleteError, isDeleted, message } = useSelector(state => state.product);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearError())
        }
        if (isDeleted) {
            alert.success(message);
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }
        dispatch(getAllUsers());
    }, [error, alert, dispatch, deleteError, isDeleted, navigate, message]);

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 200, flex: 0.8 },
        { field: "email", headerName: " Email", minWidth: 300, flex: .5 },
        { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
        {
            field: "role", headerName: "Role", type: "number", minWidth: 150, flex: 0.3,
            cellClassName: (params) => (params.row.role === "admin" ? "greenColor" : "redColor"),
        },
        {
            field: "actions", headerName: "Actions", type: "number", sortable: false, filterable: false, hideable: false, minWidth: 150, flex: .3
            , renderCell: (params) => (
                <strong>
                    <Link to={`/admin/user/${params.row.id}`} >
                        <FiEdit3 />
                    </Link>
                    <Button onClick={() => deleteUserHandler(params.row.id)}><MdDelete /></Button>
                </strong>
            ),
        },
    ];

    const rows = [];

    users && users.forEach((items) => rows.push({ id: items._id, email: items.email, name: items.name, role: items.role }));
    return (
        <>
            <Metadata title={"ALL USERS -ADMIN"} />
            <div className='dashbord'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id='productListHeading'>ALL USERS</h1>
                    <DataGrid className='productListTable' rows={rows} columns={columns} autoPageSize={true} />
                </div>
            </div>
        </>
    )
}

export default UsersList;