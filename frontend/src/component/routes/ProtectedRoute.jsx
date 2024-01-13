import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const ProtectedRoute = ({ component: Component, ...routeProps }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);

    if (!loading && isAuthenticated === false) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            {loading ? <Loader /> : (
                <Component {...routeProps} />
            )}
        </>
    );
};

export default ProtectedRoute;
