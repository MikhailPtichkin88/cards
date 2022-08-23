import React from 'react';
import styles from './UserInfo.module.css'
import avatarSvg from '../../../../assets/images/avatar.svg'
import {Button} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../../app/store";
import {logoutTC} from "../../../../features/auth/auth-reducer";

type UserInfoPropsType = {
    name:string
    avatar?:string
}

export const UserInfo = (props:UserInfoPropsType) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onClickHandler =  () => {
        dispatch(logoutTC())
        navigate("/login", {replace:true})
    }

    const avatar = props.avatar ? props.avatar : avatarSvg

    return (
        <div className={styles.wrapper}>
            <NavLink to={"/profile"} className={styles.userName}>{props.name}</NavLink>
            <img className={styles.avatarImg} src={avatar} alt="avatar"/>
            <Button size="small" variant="contained" onClick={onClickHandler}>Log Out</Button>
        </div>
    );
};

