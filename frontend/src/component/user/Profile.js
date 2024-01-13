import React from 'react'
import Metadata from '../layout/Metadata';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import "./Profile.css";

const Profile = () => {

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    console.log(user.name)

    useEffect(() => {
        if (!isAuthenticated) {
            window.location.href = '/login';
        }
    }, [isAuthenticated])
    return (
        <>
            {loading ? (<Loader />) : (
                <>
                    <Metadata title={`${user.name}'s Profile`} />
                    <div className='profileContainer'>
                        <div>
                            <h1>My Profile</h1>
                            <img src={user?.avatar?.url} alt={`${user.name}'s Profile`} />
                            <Link to="/me/update">Edit Profile</Link>

                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>

                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>

                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>

                            </div>
                            <div>
                                <Link to="/orders"> My Orders</Link>
                                <Link to="/password/update"> Change Password</Link>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Profile