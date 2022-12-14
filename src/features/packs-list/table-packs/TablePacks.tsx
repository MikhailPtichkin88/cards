import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {addNewPackTC, getPacksTC} from '../packs-reducer';
import {CustomTableBody} from '../../../common/components/table/table-body/CustomTableBody';
import {CustomTableHead} from '../../../common/components/table/table-head/CustomTableHead';
import {Loading} from '../../../common/components/loading/Loading';
import {setQueryParams} from '../cards/cards-reducer';
import {useNavigate} from 'react-router-dom';
import {GetSortPacksType} from '../packs-api';
import {Paginator} from '../../../common/components/pagination/Paginator';
import pic from "../../../assets/images/404.jpg";
import styles from './TablePack.module.css';
import Button from "@mui/material/Button";
import {EditAddModalPack} from "../edit-add-modal-pack/EditAddModalPack";
import common from "../../../common/style/style.module.css";

export type HeadCellType = {
    sortKey: string
    sortable: boolean
    title: string
}
const headCells: Array<HeadCellType> = [

    {
        sortKey: 'name',
        title: 'Name',
        sortable: true,
    },
    {
        sortKey: 'cardsCount',
        title: 'Cards',
        sortable: true,
    },
    {
        sortKey: 'updated',
        title: 'Last Updated',
        sortable: true,
    },
    {
        sortKey: 'user_name',
        title: 'Created by',
        sortable: true,
    },
    {
        sortKey: 'actions',
        title: 'Actions',
        sortable: false,
    },

]

export const CardsTable = () => {

    const navigate = useNavigate()
    const cards = useAppSelector(state => state.packs.packs.cardPacks)
    const dispatch = useAppDispatch()
    const myID = useAppSelector(state => state.auth.authData._id)
    const page = useAppSelector(state => state.packs.packs.page)
    const appStatus = useAppSelector(state => state.app.status)
    const [width, setWidth] = useState(0)

    const cardPacksTotalCount = useAppSelector(state => state.packs.packs.cardPacksTotalCount)
    const pageCount = useAppSelector(state => state.packs.packs.pageCount)

    const onClickNameHandler = useCallback((packId: string) => {
        dispatch(setQueryParams({cardsPack_id: packId}))
        navigate(`/cards/${packId}`)
    }, [dispatch, navigate])

    const tableHeadCallBack = (queryString: string) => {
        dispatch(getPacksTC({sortPacks: queryString as GetSortPacksType}))
    }
    const changePage = (newPage: number) => {
        dispatch(getPacksTC({page: newPage}))
    }
    const changeRowsPerPage = (rowsPerPage: number) => {
        dispatch(getPacksTC({pageCount: rowsPerPage, page: 1}))
    }
    const addNewPack = (name: string, deckCover:string) => {
        dispatch(addNewPackTC({name, deckCover}))
    }
    const arr: Array<HeadCellType> = useMemo(() => {
        if (width < 576) {
            return headCells.filter(column => column.sortKey !== "user_name" && column.sortKey !== "updated")
        }
        if (width < 991) {
            return headCells.filter(column => column.sortKey !== "updated")
        }
        return headCells
    }, [width])

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [])

    return (
        <>
            {
                appStatus === "loading"
                    ? <Loading/>
                    : (!cards.length)
                        ?   <div className={styles.wrapper}>
                            <img className={styles.img} src={pic} alt="No packs"/>
                            <div className={styles.descr}>
                                <div className={styles.text}>No packs found!</div>
                                <EditAddModalPack title={'Add new pack'}
                                                  saveCallback={addNewPack}
                                                  childrenDiv={ <Button variant="contained" className={styles.btn}>add new pack</Button>}/>
                            </div>
                        </div>
                        : <> <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <CustomTableHead sortCallback={tableHeadCallBack} headCells={arr}/>
                                <CustomTableBody elements={cards} myID={myID} onClickNameHandler={onClickNameHandler}
                                                 width={width}/>
                            </Table>
                        </TableContainer>
                            <Paginator
                                page={page}
                                rowsPerPage={pageCount}
                                totalCount={cardPacksTotalCount}
                                changePage={changePage}
                                changeRowsPerPage={changeRowsPerPage}
                                width={width}
                            />
                        </>
            }
        </>
    )
};

