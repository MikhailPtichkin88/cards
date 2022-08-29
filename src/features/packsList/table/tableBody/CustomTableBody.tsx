import React from 'react';
import {TableBody, TableCell, TableRow} from "@mui/material";
import styles from "../Table.module.css";
import study from "../../../../assets/images/cardPackBtns/study.svg";
import edit from "../../../../assets/images/cardPackBtns/edit.svg";
import deleteImg from "../../../../assets/images/cardPackBtns/delete.svg";
import {PackType} from "../../packs-api";

type CustomTableBodyPropsType = {
    elements: Array<PackType>
    myID: string
}
export const CustomTableBody = ({elements, myID}: CustomTableBodyPropsType) => {

    return (
        <TableBody>
            {elements.map((el) => (
                <TableRow
                    key={el._id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell component="th" scope="row">
                        {el.name}
                    </TableCell>
                    <TableCell align="right">{el.cardsCount}</TableCell>
                    <TableCell align="right">{el.updated.toString()}</TableCell>
                    <TableCell align="right">{el.user_name}</TableCell>
                    <TableCell align="right">{
                        myID === el.user_id
                            ? <div className={styles.btnBlock}>
                                <button className={styles.btn} style={{backgroundImage: `url(${study})`}}></button>
                                <button className={styles.btn} style={{backgroundImage: `url(${edit})`}}></button>
                                <button className={styles.btn}
                                        style={{backgroundImage: `url(${deleteImg})`}}></button>
                            </div>
                            :
                            <button className={styles.btn} style={{backgroundImage: `url(${study})`}}></button>

                    }</TableCell>
                </TableRow>
            ))}

        </TableBody>
    );
};

