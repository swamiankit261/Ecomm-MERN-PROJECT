import React, { useState } from 'react';
import "./NewProduct.css";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Metadata from '../layout/Metadata';
import Sidebar from './Sidebar';
import { MdEmail, MdVerifiedUser } from 'react-icons/md';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { getUserDetails, updateUser, clearError } from '../../actions/userAction';
import { BsPerson } from 'react-icons/bs';
import Loader from '../layout/Loader/Loader';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, error, user } = useSelector(state => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState();
    const [role, setRole] = useState("");


    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(id, myForm));
    };



    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }


        if (error) {
            alert.error(error);
            dispatch(clearError())
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearError())
        }
        if (isUpdated) {
            alert.success("User updated successfully");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [error, dispatch, alert, isUpdated, updateError, navigate, user, id]);

    return (
        <>
            <Metadata title={"Update User"} />

            <div className='dashbord'>
                <Sidebar />
                <div className='newProductContainer'>
                    {loading ? <Loader /> :
                        <form className='crateProductForm' encType='multipart/form-data' onSubmit={updateUserSubmitHandler}>
                            <h1>Update User</h1>
                            <div>
                                <BsPerson />
                                <input type="text" placeholder=' Name' required value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <MdEmail />
                                <input type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div>
                                <MdVerifiedUser />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>


                            <Button id='createProductBtn' type='submit' disabled={updateLoading ? true : false || role === "" ? true : false}>
                                UPDATE
                            </Button>
                        </form>}
                </div>
            </div>
        </>
    )
}


export default UpdateUser;