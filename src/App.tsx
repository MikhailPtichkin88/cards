import React from 'react';
import {NavLink} from 'react-router-dom';
import './App.css';
import {WhichRouting} from './components/WhichRouting';

function App() {
    return (
        <div className="App">
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
    );
}

export default App;
