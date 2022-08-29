import React, {useEffect} from 'react';
import {TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {getPacksTC} from '../packs-reducer';
import {CustomTableBody} from './tableBody/CustomTableBody';
import {CustomTableHead} from './TableHead/CustomTableHead';
import {Loading} from '../../../common/components/Loading/Loading';
import {setQueryParams} from '../Cards/cards-reducer';
import {useNavigate} from 'react-router-dom';

export type HeadCellType = {
    sortPart: "name"
        | "updated"
        | "cardsCount"
        | "user_name"
        | "actions"
    sortable: boolean
    title: string
}

export const CardsTable = () => {

        const navigate = useNavigate()
        const cards = useAppSelector(state => state.packs.packs.cardPacks)
        const dispatch = useAppDispatch()
        const myID = useAppSelector(state => state.auth.authData._id)
        const ownerSwitcher = useAppSelector(state => state.packs.filters.ownerSwitcher)


        // useEffect(() => {
        //     dispatch(getPacksTC({}))
        // }, [])

        const onClickHandler = () => {
            dispatch(getPacksTC({page: 2}))
        }
        const onClickNameHandler = (packId: string) => {
            dispatch(setQueryParams({cardsPack_id: packId}))
            navigate(`/cards/${packId}`)
        }

        if (!cards.length) {
            return <Loading/>
        }

        const headCells: Array<HeadCellType> = [
            {
                sortPart: "name",
                title: "Name",
                sortable: true,
            },
            {
                sortPart: "cardsCount",
                title: "Cards",
                sortable: true,
            },
            {
                sortPart: "updated",
                title: "Last Updated",
                sortable: true,
            },
            {
                sortPart: "user_name",
                title: "Created by",
                sortable: true,
            },
            {
                sortPart: "actions",
                title: "Actions",
                sortable: false,
            },

        ]
        return (
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <CustomTableHead headCells={headCells}/>
                    <CustomTableBody elements={cards} myID={myID} onClickNameHandler={onClickNameHandler}/>
                </Table>
            </TableContainer>)


    }
;

