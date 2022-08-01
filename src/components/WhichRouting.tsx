import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Profile} from "../pages/profile/Profile";
import {Login} from "../pages/login/Login";
import {NewPassword} from "../pages/newPassword/NewPassword";
import {PasswordRecovery} from "../pages/passwordRecovery/PasswordRecovery";
import {Registration} from "../pages/registration/Registration";
import {Page404} from "../pages/404/Page404";
import {TestComponent} from "../pages/TestComponent";

export const WhichRouting = () => {
    return (
        <Routes>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/new-password" element={<NewPassword/>}/>
            <Route path="/password-recovery" element={<PasswordRecovery/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/*" element={<Page404/>}/>
            <Route path="/test" element={<TestComponent/>}/>
        </Routes>
    );
};

