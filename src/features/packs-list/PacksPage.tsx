import React, {useEffect} from 'react';
import styles from './PacksPage.module.css';
import {PacksTitle} from './packs-title/PacksTitle';
import {Settings} from './settings/Settings';
import {CardsTable} from './table-packs/TablePacks';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {addNewPackTC, getPacksTC} from './packs-reducer';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {EditAddModalPack} from './modals/edit-add-modal-pack/EditAddModalPack';
import Button from '@mui/material/Button/Button';
import common from '../../common/style/style.module.css';

export const PacksPage = () => {

    const min = useAppSelector(state => state.packs.queryParams.min)
    const max = useAppSelector(state => state.packs.queryParams.max)
    const myID = useAppSelector(state => state.auth.authData._id)
    const filter = useAppSelector(state => state.packs.filters.ownerSwitcher)
    const packName = useAppSelector(state => state.packs.queryParams.packName)
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

                <EditAddModalPack title={'Add new pack'}
                                  saveCallback={addNewPack}
                                  childrenDiv={<Button variant="contained"
                                                       className={common.btnStyle}
                                                       sx={{maxWidth: '200px', mt: '0 !important'}}>
                                      {'Add new pack'}
                                  </Button>}/>
            </PacksTitle>

            <Settings/>

            <CardsTable/>

        </div>
    );
};

