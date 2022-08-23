import React from 'react';
import styles from "./AppBar.module.css"
import logo from "../../../assets/images/logo.svg"
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {initAuthStateType} from "../../../features/auth/auth-reducer";
import {UserInfo} from "./UserInfo/UserInfo";


export const AppBar = () => {
    const navigate = useNavigate();
    const auth = useSelector<RootState, initAuthStateType>(state => state.auth)

    const onClickHandler = () => {
        navigate("/login", {replace: true})
    }

    return (
        <div className={styles.wrapper}>
            <div className={"container"}>
                <div className={styles.inner}>
                    <a href="#">
                        <img src={logo} alt="logo"/>
                    </a>
                    <div>
                        {
                            auth.isAuth
                                ? <UserInfo name={auth.authData.name} avatar={auth.authData.avatar}/>
                                : <Button className={styles.btn}
                                          variant={"contained"}
                                          onClick={onClickHandler}>Sign In</Button>
                        }

                    </div>
                </div>
            </div>

        </div>
    );
};

