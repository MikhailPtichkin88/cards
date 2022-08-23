import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import './App.css';

import {useAppSelector} from '../common/hooks/useAppSelector';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {initializeAppTC} from '../features/auth/auth-reducer';
import {LinearProgress} from '@mui/material';
import {WhichRouting} from '../common/components/routes/WhichRouting';
import {routePath} from "../common/constants/routePath";
import {ErrorSnackbar} from "../common/components/errorSnackbar/ErrorSnackbar";
import {AppBar} from "../common/components/appBar/AppBar";


function App() {

    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar/>
            {status === 'loading' && <LinearProgress/>}
            <div className="container">
                <div className={'navlink'}>
                    <NavLink to={routePath.profile.main}>Profile</NavLink>
                    <NavLink to={routePath.auth.login}>login</NavLink>
                    <NavLink to={routePath.auth.newPass}>new-password</NavLink>
                    <NavLink to={routePath.auth.passRecovery}>password-recovery</NavLink>
                    <NavLink to={routePath.auth.signUp} >registration</NavLink>
                    <NavLink to={routePath.error.notFound}>404</NavLink>
                    <NavLink to={routePath.tests.test} >test</NavLink>
                </div>
                <WhichRouting/>
            </div>
        </div>
    );
}

export default App
