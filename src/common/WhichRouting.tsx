import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Profile} from '../features/profile/Profile';
import {Login} from '../features/login/Login';
import {NewPassword} from '../features/new-password/NewPassword';
import {PasswordRecovery} from '../features/password-recovery/PasswordRecovery';
import {Registration} from '../features/registration/Registration';
import {Page404} from '../features/404/Page404';
import {TestComponent} from '../features/TestComponent';

export const WhichRouting = () => {
    return (
        <Routes>
            <Route path="/new-project" element={<Profile/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Navigate to={"/profile"}/>}/>
            <Route path="/new-password" element={<NewPassword/>}/>
            <Route path="/password-recovery/:token" element={<PasswordRecovery/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="*" element={<Page404/>}/>
            <Route path="/test" element={<TestComponent/>}/>
        </Routes>
    );
};

