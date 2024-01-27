import React, { useEffect, useState } from 'react'
import "./ForgotPassword.css";
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert"
import Metadata from '../layout/Metadata';
import { clearError } from '../../actions/userAction';
import { forgotPassword } from '../../actions/updateProfileAction';
import { IoMailOutline } from 'react-icons/io5';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myFrom = new FormData();

        myFrom.set("email", email);

        dispatch(forgotPassword(myFrom));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (message) {
            alert.success(message);
            dispatch(clearError());
        }
    }, [error, message, alert, dispatch]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <Metadata title="Forgot Password" />
                    <div className='forgotPasswordContainer'>
                        <div className='forgotPasswordBox'>
                            <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                            <form className='forgotPasswordForm' encType='multipart/form-data' onSubmit={forgotPasswordSubmit}>
                                <div className='forgotPasswordEmail'>
                                    <IoMailOutline />
                                    <input type="email" placeholder='Email' required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <input type="submit" value={"Send"} className='forgotPasswordBtn' />

                            </form>
                        </div>
                    </div>
                </>)}
        </>
    )
}

export default ForgotPassword