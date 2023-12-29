import React, { useEffect, useRef, useState } from 'react'
import "./LoginSignUp.css";
import Loader from '../layout/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { IoMailOutline } from 'react-icons/io5';
import { BiFace, BiLock, BiLockOpen } from 'react-icons/bi';
import { useDispatch, useSelector } from "react-redux";
import { login, register, clearError } from '../../actions/userAction';
import { useAlert } from "react-alert"

const LoginSignUpPage = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, isAuthenticated, loading } = useSelector((state) => state.user);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setuser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.jpg");

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        const myFrom = new FormData();

        myFrom.set("name", name);
        myFrom.set("email", email);
        myFrom.set("password", password);
        myFrom.set("avatar", avatar);

        dispatch(register(myFrom));
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setuser({ ...user, [e.target.name]: e.target.value });
        }
    };


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (isAuthenticated) {
            navigate("/account")
        }
    }, [dispatch, error, alert, isAuthenticated, navigate])

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }
    return (
        <>
            {loading ? <Loader /> :
                <>
                    <div className='LoginSignUpContainer'>
                        <div className='LoginSignUpBox'>
                            <div>
                                <div className='login_signUP_toggle'>
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                                <div className='loginEmail'>
                                    <IoMailOutline />
                                    <input type="email" placeholder='Email' value={loginEmail} onChange={e => setLoginEmail(e.target.value)} autoComplete='on' />
                                </div>
                                <div className='loginPassword'>
                                    <BiLockOpen />
                                    <input type="password" autoComplete='on' value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                                </div>
                                <Link to="/password/forgot">FORGET PASSWORD ?</Link>
                                <input className='loginBtn' type="submit" value={"Login"} />

                            </form>
                            <form className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
                                <div className='signUpName'>
                                    <BiFace />
                                    <input type="text" placeholder='Name' required name='name' value={name} onChange={registerDataChange} />
                                </div>
                                <div className='signUpEmail'>
                                    <IoMailOutline />
                                    <input type="email" placeholder='Email' required name="email" value={email} onChange={registerDataChange} />
                                </div>
                                <div className='signUpPassword'>
                                    <BiLock />
                                    <input type="password" placeholder='Passwprd' required autoComplete='on' name='password' value={password} onChange={registerDataChange} />
                                </div>
                                <div id='registerImage'>
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file" name='avatar' accept='image/*' onChange={registerDataChange} />
                                </div>
                                <input type="submit" value={"Register"} className='signUpBtn' />

                            </form>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default LoginSignUpPage