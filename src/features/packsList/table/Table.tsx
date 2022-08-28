import React from 'react';
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import {Pagination} from "../pagination/Pagination";
import study from '../../../assets/images/cardPackBtns/study.svg';
import edit from '../../../assets/images/cardPackBtns/edit.svg';
import deleteImg from '../../../assets/images/cardPackBtns/delete.svg';
import styles from './Table.module.css'

export const CardsTable = () => {

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return {name, calories, fat, carbs, protein};
    }

    const rows = [
        createData('Pack Name', 159, 6.0, 24, 4.0),
        createData('Name Pack', 237, 9.0, 37, 4.3),
        createData('Pack Name', 262, 16.0, 24, 6.0),
        createData('Name Pack', 305, 3.7, 67, 4.3),
        createData('Pack Name', 356, 16.0, 49, 3.9),
    ];

    const isMy = true


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Cards</TableCell>
                        <TableCell align="right">Last Updated</TableCell>
                        <TableCell align="right">Created by</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{
                                isMy
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
                    <TableRow>
                        <Pagination  rows={rows.length}/>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

