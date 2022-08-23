import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import './App.css';

import {useAppSelector} from '../common/hooks/useAppSelector';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {initializeAppTC} from '../features/auth/auth-reducer';
import {LinearProgress} from '@mui/material';
import {WhichRouting} from '../components/WhichRouting';


function App() {

    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    return (
        <div className="App">
            {/*<ErrorSnackbar/>*/}
            {/*<AppBar/>*/}
            {status === 'loading' && <LinearProgress/>}
            <div className="container">
                <div className={'navlink'}>
                    <NavLink to={'/profile'}>Profile</NavLink>
                    <NavLink to={'/login'}>login</NavLink>
                    <NavLink to={'/new-password'}>new-password</NavLink>
                    <NavLink to={'/password-recovery'}>password-recovery</NavLink>
                    <NavLink to={'/SignUp'}>registration</NavLink>
                    <NavLink to={'*'}>404</NavLink>
                    <NavLink to={'/test'}>test</NavLink>
                </div>
                <WhichRouting/>
            </div>
        </div>
    );
}

export default App
