import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/UseAuth';
import useAdmin from '../Hooks/useAdmin';

const AdminRoute = ({children}) => {

    const {user,loading} = useAuth()
    const [isAdmin , isAdminLoading] = useAdmin()
    const location  = useLocation()

    if(loading || isAdminLoading){
        return <h1>Loading....</h1>
    }

    if(user && isAdmin){
        return children;
    }

    return <Navigate to={'/login'} state={location.pathname} replace></Navigate>
    
};

export default AdminRoute;