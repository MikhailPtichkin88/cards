import React, {useEffect} from 'react';
import styles from '../../profile/Profile.module.css';
import {routePath} from '../../../common/constants/routePath';
import {NavLink, useParams} from 'react-router-dom';
import {PacksTitle} from '../packs-title/PacksTitle';
import {TableCards} from './table-cards/TableCards';
import {Search} from '../settings/search/Search';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import Button from '@mui/material/Button/Button';
import common from '../../../common/style/style.module.css';
import {Box, Typography} from '@mui/material';
import {fetchCards, fetchCreateCard, fetchRemoveCard, fetchUpdateCard, setQueryParams} from './cards-reducer';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {Paginator} from '../../../common/components/pagination/Paginator';
import {EditAddModalCard} from './add-edit-modal-cards/EditAddModalCard';


export const Cards = () => {
    const page = useAppSelector(state => state.cards.dateCard.page)
    const pageCount = useAppSelector(state => state.cards.dateCard.pageCount)
    const cardsTotalCount = useAppSelector(state => state.cards.dateCard.cardsTotalCount)
    const cards = useAppSelector(state => state.cards.dateCard.cards)
    const cardsPack_id = useAppSelector(state => state.cards.queryCardParams.cardsPack_id)
    const packName = useAppSelector(state => state.cards.dateCard.packName)
    const myID = useAppSelector(state => state.auth.authData._id)
    const packUserId = useAppSelector(state => state.cards.dateCard.packUserId)

    const params = useParams()

    const isMy = myID === packUserId
    const dispatch = useAppDispatch()

    const onClickAddCardHandler = async (params: string | string[]) => {
        if (cardsPack_id) {
            await dispatch(fetchCreateCard({cardsPack_id, question: params[0], answer: params[1]}))
        }
    }
    const changeRowsPerPage = (pageCount: number) => {
        dispatch(setQueryParams({pageCount, page: 1}))
        dispatch(fetchCards())
    }
    const changePage = (page: number) => {
        dispatch(setQueryParams({page}))
        dispatch(fetchCards())
    }
    const updateCardHandler = (_id: string, params: string[]) => {
        dispatch(fetchUpdateCard({_id, question: params[0], answer: params[1]}))
    }
    const deleteCardHandler = (id: string) => {
        dispatch(fetchRemoveCard(id))
    }
    const searchHandler = (cardQuestion: string) => {
        dispatch(setQueryParams({cardQuestion}))
        dispatch(fetchCards())
    }

    useEffect(() => {
        if (page > 1) {
            if (cards.length === 0) {
                dispatch(setQueryParams({page: page - 1}))
                dispatch(fetchCards())
            }
        }

    }, [cards])

    useEffect(() => {
        if (!cardsPack_id) {
            dispatch(setQueryParams({cardsPack_id: params.id}))
        }
        dispatch(fetchCards())
    }, [])


    return (
        <div style={{paddingBottom: '30px'}}>
            <NavLink className={styles.packsLink} to={routePath.cards.packList}>Back to Packs List</NavLink>
            {
                cards.length > 0
                    ? <div>
                        <PacksTitle title={packName ? packName : ''}
                                    isMy={isMy}>
                            <EditAddModalCard
                                title="Add new card"
                                saveCallback={onClickAddCardHandler}
                                childrenDiv={
                                    <Button variant="contained"
                                            className={common.btnStyle}
                                            sx={{maxWidth: '200px', mt: '0 !important'}}>
                                        {'Add new card'}
                                    </Button>
                                }
                            />
                        </PacksTitle>
                        <Box sx={{mb: 4}}>
                            <Search id={'cardPacksSearch'}
                                    callback={searchHandler}
                                    valueSearch={''}/>
                        </Box>
                        <TableCards cards={cards}
                                    deleteCardHandler={deleteCardHandler}
                                    updateCardHandler={updateCardHandler}
                        />
                        <Paginator page={page}
                                   rowsPerPage={pageCount}
                                   totalCount={cardsTotalCount}
                                   changePage={changePage}
                                   changeRowsPerPage={changeRowsPerPage}
                        />
                    </div>

                    : <Box>
                        <h2>
                            name pack
                        </h2>
                        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 8}}>
                            <Typography sx={{mb: 4}}>
                                This pack is empty. {isMy && 'Click add new card to fill this pack'}
                            </Typography>
                            {isMy && <EditAddModalCard
                                title="Add new card"
                                saveCallback={onClickAddCardHandler}
                                childrenDiv={
                                    <Button variant="contained"
                                            className={common.btnStyle}
                                            sx={{maxWidth: '200px', mt: '0 !important'}}
                                    >
                                        Add new card
                                    </Button>
                                }
                            />
                            }
                        </Box>
                    </Box>
            }


        </div>
    );
};

