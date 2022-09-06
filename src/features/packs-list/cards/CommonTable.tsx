import React from 'react';
import {Box, Rating, TableBody, TableCell, TableContainer, TableRow} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import {CardType} from './cards-api';
import styles from '../table/Table.module.css';
import deleteImg from '../../../assets/images/cardPackBtns/delete.svg';
import edit from '../../../assets/images/cardPackBtns/edit.svg';
import {GetSortPacksType} from '../packs-api';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {HeadCellType} from '../table/Table';

import {CustomTableHead} from '../table/table-head/CustomTableHead';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import common from '../../../common/style/style.module.css'
import {fetchCards, setQueryParams} from './cards-reducer';
import {AddEditModalPack} from '../modals/add-edit-modal-pack/AddEditModalPack';
import {DeleteModal} from '../modals/delete-modal/DeleteModal';
import {EditAddModalCard} from '../modals/add-edit-modal-cards/EditAddModalCard';

const headCells: Array<HeadCellType> = [

    {
        sortKey: 'question',
        title: 'Question',
        sortable: true,
    },
    {
        sortKey: 'answer',
        title: 'Answer',
        sortable: true,
    },
    {
        sortKey: 'updated',
        title: 'Last Updated',
        sortable: true,
    },
    {
        sortKey: 'grade',
        title: 'Gradey',
        sortable: true,
    },
]

export const CommonTable = (props: CommonTableType) => {
    const dispatch = useAppDispatch()
    const myID = useAppSelector(state => state.auth.authData._id)
    const cardsPack_id = useAppSelector(state => state.cards.dateCard.packUserId)

    const isMy = myID === cardsPack_id

    const tableHeadCallBack = (queryString: string) => {
        dispatch(setQueryParams({sortCards: queryString as GetSortPacksType}))
        dispatch(fetchCards())
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <CustomTableHead sortCallback={tableHeadCallBack}
                                 headCells={headCells}
                                 isMy={isMy}
                                 title={'Actions'}
                                 sortKey={'actions'}
                />
                <TableBody>
                    {props.cards.map((card) => {
                        const saveCallback = (params: string[] | string) => {
                            if (Array.isArray(params)) {
                                props.updateCardHandler(card._id, params)
                            }
                        }
                        const deleteCallback = () => {
                            props.deleteCardHandler(card._id)
                        }
                        return <TableRow
                            key={card._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row"
                                       className={common.tableCell}
                            >
                                {card.question}
                            </TableCell>
                            <TableCell align="left"
                                       className={common.tableCell}
                            >{card.answer}</TableCell>
                            <TableCell align="left">{card.updated.slice(0, 10)}</TableCell>
                            <TableCell align="right" sx={{width: '50px'}}>
                                <Rating defaultValue={card.grade} precision={0.5} readOnly/>
                            </TableCell>
                            {
                                isMy &&
                                <TableCell align="right">

                                    <Box sx={{display: 'flex', justifyContent: 'space-between', width: '50px'}}>
                                        <EditAddModalCard title={'Edit card'}
                                                          valueQuestion={card.question}
                                                          valueAnswer={card.answer}
                                                          childrenDiv={<button className={styles.btn}
                                                                               style={{backgroundImage: `url(${edit})`}}/>}
                                                          saveCallback={saveCallback}/>
                                        <DeleteModal title={'Delete Card'}
                                                     name={card.answer}
                                                     childrenDiv={<button className={styles.btn}
                                                                          style={{backgroundImage: `url(${deleteImg})`}}/>}
                                                     deleteCallback={deleteCallback}/>

                                    </Box>
                                </TableCell>
                            }
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
        ;
};
//type
type CommonTableType = {
    cards: CardType[]
    updateCardHandler: (id: string, params: string[]) => void
    deleteCardHandler: (id: string) => void
}

