import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

export const Profile = () => {

    const isAuth = useSelector<RootState>(state=>state.auth.isAuth)
    if (!isAuth) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            Profile
        </div>
    );
};

