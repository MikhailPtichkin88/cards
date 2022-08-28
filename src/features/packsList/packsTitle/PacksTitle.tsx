import React from 'react';
import styles from './PacksTitle.module.css';
import Button from "@mui/material/Button/Button";

type PacksTitlePropsType = {
    title:string
    btnName:string
    callback:()=>void
}

export const PacksTitle = (props:PacksTitlePropsType) => {
    return (
        <div className={styles. titleWrapper}>
            <h2 className={styles.title}>{props.title}</h2>
            <Button variant="contained" onClick={props.callback}>{props.btnName}</Button>
        </div>
    );
};

