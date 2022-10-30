import React from 'react';
import styles from './AppBar.module.css'
import logo from '../../../assets/images/quizLogo.png'
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/useAppSelector';
import {UserInfo} from "./userInfo/UserInfo";
import Button from "@mui/material/Button";


export const AppBar = () => {
    const navigate = useNavigate();
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const name = useAppSelector(state => state.auth.authData.name)
    const avatar = useAppSelector(state => state.auth.authData.avatar)

    const onClickHandler = () => {
        navigate('/login', {replace: true})
    }

    return (
        <div className={styles.wrapper}>
            <div className={'container'}>
                <div className={styles.inner}>
                    <a href="#" className={styles.logoLink}>
                        <img src={logo} alt="logo" className={styles.logoImg}/>
                    </a>
                    <div>
                        {
                           isAuth
                                ? <UserInfo name={name} avatar={avatar}/>
                                : <Button className={styles.btn}
                                          sx={{borderRadius:'20px'}}
                                          variant={'contained'}
                                          onClick={onClickHandler}>Sign In</Button>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

