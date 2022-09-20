import React from 'react';
import {Box, Rating, TableBody, TableCell, TableContainer, TableRow} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import {CardType, CreateCardType} from '../cards-api';
import styles from '../../../../common/components/table/Table.module.css';
import deleteImg from '../../../../assets/images/cardPackBtns/delete.svg';
import edit from '../../../../assets/images/cardPackBtns/edit.svg';
import {GetSortPacksType} from '../../packs-api';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {HeadCellType} from '../../table-packs/TablePacks';

import {CustomTableHead} from '../../../../common/components/table/table-head/CustomTableHead';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import common from '../../../../common/style/style.module.css'
import {fetchCards, setQueryParams} from '../cards-reducer';
import {DeleteModal} from '../../../../common/components/modals/delete-modal/DeleteModal';
import {EditAddModalCard} from '../add-edit-modal-cards/EditAddModalCard';
import {TableCardsBody} from './TableCardsBody';
import useMediaQuery from "@mui/material/useMediaQuery";

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

export const TableCards = (props: CommonTableType) => {
    const dispatch = useAppDispatch()
    const myID = useAppSelector(state => state.auth.authData._id)
    const cardsPack_id = useAppSelector(state => state.cards.dateCard.packUserId)

    const isMy = myID === cardsPack_id

    const tableHeadCallBack = (queryString: string) => {
        dispatch(setQueryParams({sortCards: queryString as GetSortPacksType}))
        dispatch(fetchCards())
    }

    const matches = useMediaQuery('(min-width:991px)');
    const filteredHeadCells = matches? headCells : headCells.filter(cell=>cell.title==="Question" || cell.title==="Answer")

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: `${matches?650:350}`}} aria-label="simple table">
                <CustomTableHead sortCallback={tableHeadCallBack}
                                 headCells={filteredHeadCells}
                                 isMy={isMy}
                                 title={'Actions'}
                                 sortKey={'actions'}
                />
                <TableCardsBody cards={props.cards}
                                isMy={isMy}
                                updateCardHandler={props.updateCardHandler}
                                deleteCardHandler={props.deleteCardHandler}
                                isDesktopWidth={matches}/>
            </Table>
        </TableContainer>
    )
        ;
};
//type
type CommonTableType = {
    cards: CardType[]
    updateCardHandler: (id: string, params: CreateCardType) => void
    deleteCardHandler: (id: string) => void
}

