import React from 'react';
import infoImg from '../../../assets/images/information.svg'
import learnImg from '../../../assets/images/cardPackBtns/study.svg'
import editImg from '../../../assets/images/cardPackBtns/edit.svg'
import deleteImg from '../../../assets/images/cardPackBtns/delete.svg'
import styles from './InfoBlockActions.module.css'
import Paper from "@mui/material/Paper/Paper";

export const InfoBlockActions = () => {
    return (
        <Paper className={styles.wrapper}>
            <img className={styles.infoImg} src={infoImg} alt="info"/>
            <div>
            <p className={styles.descr}>In the <b>Actions</b> column you can manage your card packs:</p>
            <ul className={styles.actionsList}>
                <li className={styles.actionsItem}>
                    <img className={styles.actionsImg} src={learnImg} alt="learn cards"/>
                    <p className={styles.actionsDescr}>Start the cards quiz (start learning). <br/> <b>disabled</b>  when the pack is empty (please create cards first)</p>
                </li>
                <li className={styles.actionsItem}>
                    <img className={styles.actionsImg} src={editImg} alt="edit card pack"/>
                    <p className={styles.actionsDescr}>Edit button allows you to upload new cover, change name of this pack or switch to private mode so that other users can't see it</p>
                </li>
                <li className={styles.actionsItem}>
                    <img className={styles.actionsImg} src={deleteImg} alt="delete pack"/>
                    <p className={styles.actionsDescr}>Delete this pack with all cards inside of it (<b>caution</b>: you can't restore it after)</p>
                </li>
            </ul>
            <p><b>To create or manage cards</b> inside of each pack just click on the pack's name or cover</p>
            </div>
        </Paper>
    );
};

