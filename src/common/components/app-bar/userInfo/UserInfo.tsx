import React, {useEffect, useState} from 'react';
import styles from './UserInfo.module.css'
import avatar from '../../../../assets/images/profileAvatar.jpg'
import {Button} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";

import {logoutTC} from "../../../../features/auth/auth-reducer";
import {useAppDispatch} from '../../../hooks/useAppDispatch';

type UserInfoPropsType = {
    name: string
    avatar?: string
}

export const UserInfo = (props: UserInfoPropsType) => {
    const [width, setWidth] = useState(0)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onClickHandler = () => {
        dispatch(logoutTC())
        navigate("/login", {replace: true})
    }

    const avatarImg = props.avatar ? props.avatar : avatar
    useEffect(() => {
        setWidth(window.innerWidth)
    }, [])

    return (
        <div className={styles.wrapper}>
            <NavLink to={"/profile"} className={styles.userName}>{props.name}</NavLink>
            <img className={styles.avatarImg} src={avatarImg} alt="avatar"/>
            {
                width > 991 &&  <Button sx={{borderRadius:'20px'}} size="small" variant="contained" onClick={onClickHandler}>Log Out</Button>
            }
        </div>
    );
};

