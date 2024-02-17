import React, { useEffect, useState } from 'react'
import "./UpdateProfile.css";
import Loader from '../layout/Loader/Loader';
import { IoMailOutline } from 'react-icons/io5';
import { BiFace } from 'react-icons/bi';
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser } from '../../actions/userAction';
import { updateProfile } from '../../actions/updateProfileAction';
import { useAlert } from "react-alert"
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import Metadata from '../layout/Metadata';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.jpg");


    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myFrom = new FormData();

        myFrom.set("name", name);
        myFrom.set("email", email);
        myFrom.set("avatar", avatar);

        dispatch(updateProfile(myFrom));
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };


    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar?.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        if (isUpdated) {
            alert.success("profile updated");
            dispatch(loadUser());
            navigate("/account");

            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, alert, isUpdated, user, navigate])

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <Metadata title="Update Profile" />
                    <div className='updateProfileContainer'>
                        <div className='updateProfileBox'>
                            <h2 className='updateProfileHeading'>Update Profile</h2>
                            <form className='updateProfileForm' encType='multipart/form-data' onSubmit={updateProfileSubmit}>
                                <div className='updateProfileName'>
                                    <BiFace />
                                    <input type="text" placeholder='Name' required name='name' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='updateProfileEmail'>
                                    <IoMailOutline />
                                    <input type="email" placeholder='Email' required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div id='updateProfileImage'>
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file" name='avatar' accept='image/*' onChange={updateProfileDataChange} />
                                </div>
                                <input type="submit" value={"update"} className='updateProfileBtn' />

                            </form>
                        </div>
                    </div>
                </>)}
        </>
    )
}

export default UpdateProfile