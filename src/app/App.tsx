import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import './App.css';
import {WhichRouting} from '../common/WhichRouting';
import {AppBar} from "../common/components/appBar/AppBar";
import {RootState, useAppDispatch} from "./store";
import {initializeAppTC} from "../features/auth/auth-reducer";
import {useSelector} from "react-redux";
import {RequestStatusType} from "./app-reducer";
import {LinearProgress} from "@mui/material";
import {ErrorSnackbar} from "../common/components/errorSnackbar/ErrorSnackbar";

function App() {

    const status = useSelector<RootState, RequestStatusType>(state=>state.app.status)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar/>
            {status==="loading" && <LinearProgress />}
            <div className="container">
                <div className={'navlink'}>
                    <NavLink to={'/profile'}>Profile</NavLink>
                    <NavLink to={'/login'}>login</NavLink>
                    <NavLink to={'/new-password'}>new-password</NavLink>
                    <NavLink to={'/password-recovery'}>password-recovery</NavLink>
                    <NavLink to={'/registration'}>registration</NavLink>
                    <NavLink to={'*'}>404</NavLink>
                    <NavLink to={'/test'}>test</NavLink>
                </div>
                <WhichRouting/>
            </div>
        </div>
    );
}

export default App;
