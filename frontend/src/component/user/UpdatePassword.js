import React, { useEffect, useState } from 'react'
import "./UpdatePassword.css";
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { MdOutlineVpnKey } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { BiLockOpen } from 'react-icons/bi';
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser } from '../../actions/userAction';
import { useAlert } from "react-alert"
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import Metadata from '../layout/Metadata';
import { updateUserPassword } from '../../actions/updateProfileAction';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myFrom = new FormData();

        myFrom.set("oldPassword", oldPassword);
        myFrom.set("newPassword", newPassword);
        myFrom.set("confirmPassword", confirmPassword);

        dispatch(updateUserPassword(myFrom));
    }


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (isUpdated) {
            alert.success("profile updated");
            dispatch(loadUser());
            navigate("/account");

            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, alert, isUpdated, navigate])
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <Metadata title="Change Password" />
                    <div className='updatePasswordContainer'>
                        <div className='updatePasswordBox'>
                            <h2 className='updatePasswordHeading'>Update Password</h2>
                            <form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>
                                <div className='updatePassword'>
                                    <MdOutlineVpnKey />
                                    <input type="password" autoComplete='on' value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder='Enter your oldPassword' />
                                </div>
                                <div className='updatePassword'>
                                    <BiLockOpen />
                                    <input type="password" autoComplete='on' value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder='Enter new password' />
                                </div>
                                <div className='updatePassword'>
                                    <MdLockOutline />
                                    <input type="password" autoComplete='on' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='confrimPassword' />
                                </div>
                                <input type="submit" value={"Change"} className='updatePasswordBtn' />

                            </form>
                        </div>
                    </div>
                </>)}
        </>
    )
}

export default UpdatePassword