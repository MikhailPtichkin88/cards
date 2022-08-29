import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import styles from '../Table.module.css';
import study from '../../../../assets/images/cardPackBtns/study.svg';
import edit from '../../../../assets/images/cardPackBtns/edit.svg';
import deleteImg from '../../../../assets/images/cardPackBtns/delete.svg';
import {PackType} from '../../packs-api';

type CustomTableBodyPropsType = {
    elements: Array<PackType>
    myID: string
    onClickNameHandler: (packId: string) => void
}
export const CustomTableBody = ({elements, myID, onClickNameHandler}: CustomTableBodyPropsType) => {

    return (
        <TableBody>
            {elements.map((el) => (
                <TableRow
                    key={el._id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell component="th" scope="row"
                               onClick={() => onClickNameHandler(el._id)}
                               style={{cursor: 'pointer'}}
                    >
                        {el.name}
                    </TableCell>
                    <TableCell align="right">{el.cardsCount}</TableCell>
                    <TableCell align="right">{el.updated.toString()}</TableCell>
                    <TableCell align="right">{el.user_name}</TableCell>
                    <TableCell align="right">{
                        myID === el.user_id
                            ? <div className={styles.btnBlock}>
                                <button className={styles.btn} style={{backgroundImage: `url(${study})`}}/>
                                <button className={styles.btn} style={{backgroundImage: `url(${edit})`}}/>
                                <button className={styles.btn}
                                        style={{backgroundImage: `url(${deleteImg})`}}/>
                            </div>
                            :
                            <button className={styles.btn} style={{backgroundImage: `url(${study})`}}/>

                    }</TableCell>
                </TableRow>
            ))}

        </TableBody>
    );
};

