import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Page404} from '../features/404/Page404';
import {Login} from '../features/login/Login';
import {NewPassword} from '../features/new-password/NewPassword';
import {PasswordRecovery} from '../features/password-recovery/PasswordRecovery';
import {Profile} from '../features/profile/Profile';
import {TestComponent} from '../features/TestComponent';
import {SignUp} from '../pages/SignUp/SignUp';


export const WhichRouting = () => {
    return (
        <Routes>
            <Route path="/new-project" element={<Profile/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/set-new-password/:token" element={<NewPassword/>}/>
            <Route path="/password-recovery" element={<PasswordRecovery/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="*" element={<Page404/>}/>
            <Route path="/test" element={<TestComponent/>}/>
        </Routes>
    );
};

