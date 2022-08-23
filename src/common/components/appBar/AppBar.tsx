import React from 'react';
import styles from './AppBar.module.css'
import logo from '../../../assets/images/logo.svg'
import {useNavigate} from 'react-router-dom';

import {useAppSelector} from '../../hooks/useAppSelector';
import {UserInfo} from "./UserInfo/UserInfo";
import Button from "@mui/material/Button";


export const AppBar = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth)

    const onClickHandler = () => {
        navigate('/login', {replace: true})
    }

    return (
        <div className={styles.wrapper}>
            <div className={'container'}>
                <div className={styles.inner}>
                    <a href="#">
                        <img src={logo} alt="logo"/>
                    </a>
                    <div>
                        {
                            auth.isAuth
                                ? <UserInfo name={auth.authData.name} avatar={auth.authData.avatar}/>
                                : <Button className={styles.btn}
                                          variant={'contained'}
                                          onClick={onClickHandler}>Sign In</Button>
                        }

                    </div>
                </div>
            </div>

        </div>
    );
};

