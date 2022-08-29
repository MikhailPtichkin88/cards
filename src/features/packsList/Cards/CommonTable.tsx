import React from 'react';
import {Box, Rating, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import {CardType} from './cards-api';
import styles from '../table/Table.module.css';
import deleteImg from '../../../assets/images/cardPackBtns/delete.svg';
import edit from '../../../assets/images/cardPackBtns/edit.svg';

export const CommonTable = (props: CommonTableType) => {

    const isMy = true

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Question</TableCell>
                        <TableCell align="left">Answer</TableCell>
                        <TableCell align="left" width={'100px'}>Last Updated</TableCell>
                        <TableCell align="left" width={'100px'}>Grade</TableCell>
                        {
                            isMy && <TableCell align="right" width={'50px'}/>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.cards.map((card) => (
                        <TableRow
                            key={card._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {card.question}
                            </TableCell>
                            <TableCell align="left">{card.answer}</TableCell>
                            <TableCell align="left">{card.updated.slice(0, 10)}</TableCell>
                            <TableCell align="right">
                                <Rating defaultValue={card.grade} precision={0.5} readOnly/>
                            </TableCell>
                            {
                                isMy &&
                                <TableCell align="right">
                                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                        <button className={styles.btn}
                                                style={{backgroundImage: `url(${edit})`}}
                                                onClick={() => props.updateCardHandler(card._id)}
                                        />
                                        <button className={styles.btn}
                                                style={{backgroundImage: `url(${deleteImg})`}}
                                                onClick={() => props.deleteCardHandler(card._id)}
                                        />
                                    </Box>
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
//type
type CommonTableType = {
    cards: CardType[]
    updateCardHandler: (id: string) => void
    deleteCardHandler: (id: string) => void
}

