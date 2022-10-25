import React, {useEffect, useState} from 'react';
import styles from '../../profile/Profile.module.css';
import {routePath} from '../../../common/constants/routePath';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {PacksTitle} from '../packs-title/PacksTitle';
import {TableCards} from './table-cards/TableCards';
import {Search} from '../settings/search/Search';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import Button from '@mui/material/Button/Button';
import common from '../../../common/style/style.module.css';
import {Box, IconButton, Typography} from '@mui/material';
import {fetchCards, fetchCreateCard, fetchRemoveCard, fetchUpdateCard, setQueryParams} from './cards-reducer';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {Paginator} from '../../../common/components/pagination/Paginator';
import {EditAddModalCard} from './add-edit-modal-cards/EditAddModalCard';
import {CreateCardType} from './cards-api';
import {KebabLearnMenu} from "../../../common/components/learn-menu/KebabLearnMenu";
import SchoolIcon from '@mui/icons-material/School';

export const Cards = () => {
    const [width, setWidth] = useState(0)
    const navigate = useNavigate()

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

    const onClickAddCardHandler = async (params: CreateCardType) => {
        if (cardsPack_id) {
            await dispatch(fetchCreateCard({cardsPack_id, ...params}))
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
    const updateCardHandler = (_id: string, params: CreateCardType) => {
        dispatch(fetchUpdateCard({_id, ...params}))
    }
    const deleteCardHandler = (id: string) => {
        dispatch(fetchRemoveCard(id))
    }
    const searchHandler = (cardQuestion: string) => {
        dispatch(setQueryParams({cardQuestion}))
        dispatch(fetchCards())
    }
    const redirectToStudy = () => {
        if (cardsPack_id) {
            return navigate(routePath.cards.learn + cardsPack_id)
        }
    }

    useEffect(() => {
        if (page > 1) {
            if (cards.length === 0) {
                dispatch(setQueryParams({page: page - 1}))
                dispatch(fetchCards())
            }
        }

    }, [cards, page])

    useEffect(() => {
        if (!cardsPack_id) {
            dispatch(setQueryParams({cardsPack_id: params.id}))
        }
        dispatch(fetchCards())
    }, [])

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [])

    return (
        <div style={{paddingBottom: '30px'}}>
            <NavLink className={styles.packsLink} to={routePath.cards.packList}>Back to Packs List</NavLink>
            {
                cards.length > 0
                    ? <div style={{position:"relative"}}>
                        <PacksTitle title={packName ? packName : ''}
                                    packId={cardsPack_id}
                                    isMy={isMy}>
                            {
                                isMy && <> <KebabLearnMenu packName={packName ? packName : ''} packId={cardsPack_id}/>
                                    <EditAddModalCard
                                        title="Add new card"
                                        saveCallback={onClickAddCardHandler}
                                        childrenBtn={
                                            <Button variant="contained"
                                                    className={common.btnStyle}
                                                    sx={{maxWidth: '200px', mt: '0 !important'}}>
                                                {'Add new card'}
                                            </Button>}/></>
                            }
                        </PacksTitle>
                        {
                            !isMy && <div style={{position: "absolute", top: "5px",right:"20px"}}>
                                <IconButton onClick={redirectToStudy} size="large">
                                    <SchoolIcon color="primary" fontSize="large"/>
                                </IconButton>
                            </div>
                        }
                        <Box sx={{mb: 4}}>
                            <Search id={'cardPacksSearch'}
                                    callback={searchHandler}
                                    valueSearch={''}/>
                        </Box>
                        <TableCards cards={cards}
                                    deleteCardHandler={deleteCardHandler}
                                    updateCardHandler={updateCardHandler}
                        />
                        <Paginator width={width}
                                   page={page}
                                   rowsPerPage={pageCount}
                                   totalCount={cardsTotalCount}
                                   changePage={changePage}
                                   changeRowsPerPage={changeRowsPerPage}
                        />
                    </div>

                    : <Box>
                        <h2>
                            {packName}
                        </h2>
                        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 8}}>
                            <Typography sx={{mb: 4}}>
                                This pack is empty. {isMy && 'Click add new card to fill this pack'}
                            </Typography>
                            {isMy && <EditAddModalCard
                                title="Add new card"
                                saveCallback={onClickAddCardHandler}
                                childrenBtn={
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


