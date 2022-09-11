import React, {ChangeEvent, useRef} from 'react'
import styles from './Profile.module.css'
import {Navigate, NavLink} from 'react-router-dom';
import Paper from '@mui/material/Paper/Paper';
import img from '../../assets/images/profileAvatar.jpg'
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {EditableSpan} from '../../common/components/editableSpan/EditableSpan';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {changeNameAndAvatarTC, logoutTC} from '../auth/auth-reducer';
import commonStyle from '../../common/style/style.module.css';
import {routePath} from '../../common/constants/routePath';
import {setAppErrorAC} from "../../app/app-reducer";
import {convertFileToBase64} from "../../common/utils/convert-base64";

export const Profile = () => {
    const inputRef = useRef<HTMLInputElement>(null)

    const name = useAppSelector(state => state.auth.authData.name)
    const email = useAppSelector(state => state.auth.authData.email)
    const avatar = useAppSelector(state => state.auth.authData.avatar)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const dispatch = useAppDispatch()

    const avatarImg = avatar ? avatar : img

    const onClickLogout = () => {
        dispatch(logoutTC())
    }

    const onChangeName = (name: string) => {
        dispatch(changeNameAndAvatarTC(name, avatarImg))
    }

    const onChangeAvatar = () => {
        inputRef && inputRef.current?.click()
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            if (e.target.files[0].size / 1024 <= 4096) {
                const file = e.target.files[0]
                convertFileToBase64(file, (file64) => {
                    dispatch(changeNameAndAvatarTC(name, file64))
                })
            } else {
                dispatch(setAppErrorAC("Incorrect file size"))
            }
        } else {
            dispatch(setAppErrorAC("Upload error"))
        }
    }

    if (!isAuth) {
        return <Navigate to={routePath.auth.login}/>
    }
    return <div className={styles.wrapper}>
        <NavLink className={styles.packsLink} to={routePath.cards.packList}>Back to Packs List</NavLink>
        <Paper elevation={20} className={commonStyle.paperStyle}>
            <div className={styles.profileWrapper}>
                <h3 className={styles.title}>Personal Information</h3>
                <div className={styles.avatarBlock}>
                    <img className={styles.avatarImg} src={avatarImg} alt="avatar"/>
                    <label>
                        <button onClick={onChangeAvatar} className={styles.avatarBtn}/>
                        <input ref={inputRef}
                               className={styles.avatarInput}
                               type="file"
                               onChange={uploadHandler}
                               accept="image/jpeg"/>
                    </label>

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
