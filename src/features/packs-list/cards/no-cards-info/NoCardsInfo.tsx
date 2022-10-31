import React from 'react';
import Paper from "@mui/material/Paper/Paper";
import styles from "./NoCardsInfo.module.css";
import studyImg from "../../../../assets/images/study.svg";
import lazy from '../../../../assets/images/lazy.png'

type NoCardsInfoPropsType = {
    isMy: boolean
}
export const NoCardsInfo: React.FC<NoCardsInfoPropsType> = ({isMy}) => {

    return (
        <Paper className={styles.infoBlock}>
            {
                isMy
                    ? <>
                        <img className={styles.infoImg} src={studyImg} alt="study"/>
                        <p className={styles.infoText}>This pack is empty, you have to add the cards first</p>
                        <ul className={styles.list}>
                            <li className={styles.item}>Click add new card button</li>
                            <li className={styles.item}>Write the question and answer to this question or upload pictures
                                with question and answer (one picture must be less than 400 Kb)
                            </li>
                            <li className={styles.item}>Press save button</li>
                            <li className={styles.item}>Create several cards and start the quiz! :)</li>
                        </ul>

                    </>
                    : <>
                        <img className={styles.infoImg} style={{width: "150px", height: "150px"}} src={lazy}
                             alt="lazy animal"/>
                        <p className={styles.infoText}>In order to start a quiz on this deck, you need to wait until its
                            creator adds cards to it.
                        </p>
                        <p>You can pick another deck from list or create your own mega super outstanding card pack! :)
                        </p>
                    </>
            }
        </Paper>
    );
};