import React, {useEffect, useState} from 'react';
import styles from './PackList.module.css';
import {PacksTitle} from './packs-title/PacksTitle';
import {Settings} from './settings/Settings';
import {CardsTable} from './table/Table';
import {NavLink} from 'react-router-dom';
import {routePath} from '../../common/constants/routePath';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {addNewPackTC, getPacksTC} from './packs-reducer';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {Loading} from '../../common/components/loading/Loading';
import {AddEditModalPack} from './modals/add-edit-modal-pack/AddEditModalPack';
import {EditAddModalCard} from './modals/add-edit-modal-cards/EditAddModalCard';
import Button from '@mui/material/Button/Button';
import common from '../../common/style/style.module.css';

export const PacksList = () => {

    const min = useAppSelector(state => state.packs.queryParams.min)
    const max = useAppSelector(state => state.packs.queryParams.max)
    const myID = useAppSelector(state => state.auth.authData._id)
    const filter = useAppSelector(state => state.packs.filters.ownerSwitcher)
    const packName = useAppSelector(state => state.packs.queryParams.packName)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    const addNewPack = (name: string) => {
        dispatch(addNewPackTC({name}))

    }

    useEffect(() => {

        const user_id = filter === 'my' ? myID : undefined
        dispatch(getPacksTC({user_id, packName, min, max}))

    }, [packName, filter, min, max])

    return (
        <div className={styles.wrapper}>
            <PacksTitle title={'Packs list'}>
                <AddEditModalPack title={'Add new pack'}
                                  childrenDiv={
                                      <Button variant="contained"
                                              className={common.btnStyle}
                                              sx={{maxWidth: '200px', mt: '0 !important'}}>
                                          {'Add new card'}
                                      </Button>}
                                  saveCallback={addNewPack}/>
            </PacksTitle>
            <Settings/>
            <CardsTable/>

        </div>
    );
};

