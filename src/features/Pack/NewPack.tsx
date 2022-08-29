import React from 'react';
import styles from './NewPack.module.css';
import {BackToPacksLink} from "../../common/components/BackToPacksLink/BackToPacksLink";
import Button from "@mui/material/Button/Button";


export const NewPack = () => {

    const onClickHandler = ()=>{
        alert("see you next week")
    }

    return (
        <div className={styles.wrapper}>
            <BackToPacksLink/>
            <h2 className={styles.title}>Name Pack</h2>
            <p className={styles.descr}>This pack is empty. Click add new card to fill this pack</p>
            <div className={styles.btnWrapper}>
                <Button variant="contained" onClick={onClickHandler}>Add new card</Button>
            </div>

        </div>
    );
};

