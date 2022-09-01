import React, {useEffect} from 'react';
import styles from './PackList.module.css';
import {PacksTitle} from './packsTitle/PacksTitle';
import {Settings} from './settings/Settings';
import {CardsTable} from './table/Table';
import {NavLink} from 'react-router-dom';
import {routePath} from '../../common/constants/routePath';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {addNewPackTC, getPacksTC} from './packs-reducer';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {Loading} from '../../common/components/Loading/Loading';

export const PacksList = () => {
    const min = useAppSelector(state => state.packs.queryParams.min)
    const max = useAppSelector(state => state.packs.queryParams.max)
    const myID = useAppSelector(state => state.auth.authData._id)
    const filter = useAppSelector(state => state.packs.filters.ownerSwitcher)
    const packName = useAppSelector(state => state.packs.queryParams.packName)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    const addNewPack = () => {
        dispatch(addNewPackTC({name: new Date().getMinutes().toString()}))
    }

    useEffect(() => {

        const user_id = filter === 'my' ? myID : undefined
        dispatch(getPacksTC({user_id, packName, min, max}))

    }, [packName, filter, min, max])

    return (
        <div className={styles.wrapper}>
            <PacksTitle title={'Packs list'}
                        btnName={'Add new pack'}
                        callback={addNewPack}/>
            <Settings/>
            <CardsTable/>
            <NavLink to={routePath.cards.newPack}>NewPack page sample</NavLink>
        </div>
    );
};

