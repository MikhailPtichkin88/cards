import React from 'react';
import styles from './PacksTitle.module.css';
import Button from '@mui/material/Button/Button';
import common from '../../../common/style/style.module.css'

type PacksTitlePropsType = {
    title: string
    btnName: string
    callback: () => void
}

export const PacksTitle = (props: PacksTitlePropsType) => {
    return (
        <div className={styles.titleWrapper}>
            <h2 className={styles.title}>{props.title}</h2>
            <Button variant="contained"
                    onClick={props.callback}
                    className={common.btnStyle}
                    sx={{maxWidth: '200px', mt: '0 !important'}}
            >{props.btnName}</Button>
        </div>
    );
};

