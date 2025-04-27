import React from 'react';
import useAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';

const PrivateRoute = ({children}) => {

    const {user,loading} = useAuth()
    const location = useLocation()

    if(loading){
        return <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="Loading..." />
      </div>
    }
    if(user){
        return children;
    }

    return <Navigate  state={location.pathname} to={'/login'}></Navigate>;
};

export default PrivateRoute;