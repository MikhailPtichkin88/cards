import React, {ChangeEvent, useRef} from 'react'
import styles from './Profile.module.css'
import {Navigate, NavLink, useNavigate} from 'react-router-dom';
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
import studyImg from '../../assets/images/study.svg'
import createPackImg from '../../assets/images/createPack.svg'
import Button from "@mui/material/Button/Button";
import common from "../../common/style/style.module.css";
import {EditAddModalPack} from "../packs-list/edit-add-modal-pack/EditAddModalPack";
import {addNewPackTC, filterPacksWithOwnerSwitcherAC} from "../packs-list/packs-reducer";
import {packsAPI} from "../packs-list/packs-api";
import {handleServerNetworkError} from "../../common/utils/error-utils";
import {AxiosError} from "axios";

export const Profile = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
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

    const addNewPack = async (name: string, deckCover: string) => {
        try{
            await packsAPI.addNewPack(({name, deckCover}))
            dispatch(filterPacksWithOwnerSwitcherAC('my'))
            navigate(routePath.cards.packList)
        }catch(err){
            handleServerNetworkError(err as Error | AxiosError<{ error: string }>, dispatch)
        }
    }

    if (!isAuth) {
        return <Navigate to={routePath.auth.login}/>
    }

    return <div className={styles.wrapper}>

        <Paper className={styles.infoBlock}>
            <img className={styles.infoImg} src={studyImg} alt="study"/>
            <p className={styles.infoText}>Start learning by choosing one from from existing card packs</p>
            <NavLink className={styles.packsLink} to={routePath.cards.packList}>Choose cards pack</NavLink>
        </Paper>
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
        <Paper className={styles.infoBlock}>
            <img className={styles.infoImg} src={createPackImg} alt="create pack"/>
            <p className={styles.infoText}>Create you own new cards pack and start study</p>
            <EditAddModalPack title={'Add new pack'}
                              saveCallback={addNewPack}
                              childrenDiv={<button className={styles.packsLink}>
                                  {'Add new pack'}
                              </button>}/>
        </Paper>
    </div>
}
