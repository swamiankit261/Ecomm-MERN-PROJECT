import React, { useEffect, useState } from 'react'
import "./ResetPassword.css";
import Loader from '../layout/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { MdLockOutline } from "react-icons/md";
import { BiLockOpen } from 'react-icons/bi';
import { useDispatch, useSelector } from "react-redux";
import { clearError } from '../../actions/userAction';
import { useAlert } from "react-alert"
import Metadata from '../layout/Metadata';
import { forgotPassword } from '../../actions/updateProfileAction';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { token } = useParams();


    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myFrom = new FormData();

        myFrom.set("newPassword", newPassword);
        myFrom.set("confirmPassword", confirmPassword);

        dispatch(forgotPassword(token, myFrom));
    }


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (success) {
            alert.success("Password updated successfully");

            navigate("/login");
        }
    }, [dispatch, error, alert, success, navigate])
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <Metadata title="Change Password" />
                    <div className='resetPasswordContainer'>
                        <div className='resetPasswordBox'>
                            <h2 className='resetPasswordHeading'>Update Password</h2>
                            <form className='resetPasswordForm' onSubmit={resetPasswordSubmit}>
                                <div>
                                    <BiLockOpen />
                                    <input type="password" autoComplete='on' value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder='Enter new password' />
                                </div>
                                <div>
                                    <MdLockOutline />
                                    <input type="password" autoComplete='on' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='confrimPassword' />
                                </div>
                                <input type="submit" value={"Update"} className='resetPasswordBtn' />

                            </form>
                        </div>
                    </div>
                </>)}
        </>
    )
}

export default ResetPassword