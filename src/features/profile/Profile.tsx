import React from 'react'
import styles from "./Profile.module.css"
import {Navigate, NavLink} from "react-router-dom";
import Paper from "@mui/material/Paper/Paper";
import img from "../../assets/images/profileAvatar.jpg"
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {EditableSpan} from "../../common/components/editableSpan/EditableSpan";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {changeNameTC, logoutTC} from "../auth/auth-reducer";
import commonStyle from '../../common/style/style.module.css';
import {routePath} from "../../common/constants/routePath";

export const Profile = () => {

    const {name, email, avatar} = useAppSelector(state => state.auth.authData)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    const avatarImg = avatar ? avatar : img
    const onClickLogout = () => {
        dispatch(logoutTC())
    }

    const onChangeName = (name: string) => {
        dispatch(changeNameTC(name))
    }

    if (!isAuth) {
        return <Navigate to={routePath.auth.login}/>
    }
    return <div className={styles.wrapper}>
        <NavLink className={styles.packsLink} to={"/packs-list"}>Back to Packs List</NavLink>
        <Paper elevation={20} className={commonStyle.paperStyle}>
            <div className={styles.profileWrapper}>
                <h3 className={styles.title}>Personal Information</h3>
                <div className={styles.avatarBlock}>
                    <img className={styles.avatarImg} src={avatarImg} alt="avatar"/>
                    <button className={styles.avatarBtn}/>
                </div>
                <div className={styles.nameBlock}>
                    <EditableSpan onChangeText={onChangeName} value={name} label="Nickname" className={styles.name}/>
                    <p className={styles.email}>{email}</p>
                </div>
                <button className={styles.LogoutBtn} onClick={onClickLogout}>Log Out</button>
            </div>
        </Paper>
    </div>
}
