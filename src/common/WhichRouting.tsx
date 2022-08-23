import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {Profile} from '../features/profile/Profile'
import {Login} from '../features/login/Login'
import {NewPassword} from '../features/new-password/NewPassword'
import {PasswordRecovery} from '../features/password-recovery/PasswordRecovery'
import {Registration} from '../features/registration/Registration'
import {Page404} from '../features/404/Page404'
import {TestComponent} from '../features/TestComponent'
import {CheckEmail} from '../features/password-recovery/CheckEmail';

export const WhichRouting = () => {
    return (
        <Routes>
            <Route index element={<Profile/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/password-recovery" element={<PasswordRecovery/>}/>
            <Route path="/password-recovery/check-email" element={<CheckEmail/>}/>
            <Route path="/set-new-password/:token" element={<NewPassword/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="*" element={<Page404/>}/>
            <Route path="/test" element={<TestComponent/>}/>
        </Routes>
    )
}
