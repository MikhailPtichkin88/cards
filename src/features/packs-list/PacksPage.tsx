import React, {memo, useEffect} from 'react';
import styles from './PacksPage.module.css';
import {PacksTitle} from './packs-title/PacksTitle';
import {Settings} from './settings/Settings';
import {CardsTable} from './table-packs/TablePacks';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {addNewPackTC, getPacksTC} from './packs-reducer';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {EditAddModalPack} from './edit-add-modal-pack/EditAddModalPack';
import Button from '@mui/material/Button/Button';
import common from '../../common/style/style.module.css';
import {InfoBlockActions} from "../../common/components/info-block-actions/InfoBlockActions";
import {Loading} from "../../common/components/loading/Loading";
import {Navigate} from "react-router-dom";
import {routePath} from "../../common/constants/routePath";
import {AppStatusType} from "../../app/app-reducer";

export const PacksPage = memo(() => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const appStatus: AppStatusType = useAppSelector(state => state.app.status)
    const min = useAppSelector(state => state.packs.queryParams.min)
    const max = useAppSelector(state => state.packs.queryParams.max)
    const myID = useAppSelector(state => state.auth.authData._id)
    const filter = useAppSelector(state => state.packs.filters.ownerSwitcher)
    const packName = useAppSelector(state => state.packs.queryParams.packName)
    const dispatch = useAppDispatch()

    const addNewPack = (name: string, deckCover: string) => {
        dispatch(addNewPackTC({name, deckCover}))
    }

    useEffect(() => {

        const user_id = filter === 'my' ? myID : undefined
        dispatch(getPacksTC({user_id, packName, min, max}))

    }, [packName, min, max, filter])

    if (!isAuth) {
        return <Navigate to={routePath.auth.login}/>
    }


    return (
        <div className={styles.wrapper}>
            <PacksTitle title={'Packs list'}>
                {
                    filter === 'my' && <InfoBlockActions/>
                }
                <EditAddModalPack title={'Add new pack'}
                                  saveCallback={addNewPack}
                                  childrenDiv={<Button variant="contained"
                                                       className={common.btnStyle}
                                                       sx={{maxWidth: '200px', mt: '0 !important'}}>
                                      {'Add new pack'}
                                  </Button>}/>
            </PacksTitle>

            <Settings/>
            {
                appStatus === "loading"
                    ? <Loading/>
                    : <CardsTable/>
            }
        </div>
    );

});

