import React, {useCallback, useEffect} from 'react';
import styles from './Settings.module.css';
import {Search} from './search/Search';
import {OwnerSwitcher} from './ownerSwitcher/OwnerSwitcher';
import {CardsSlider} from './cardsSlider/CardsSlider';
import {DisableFilter} from './disableFilter/DisableFilter';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {getPacksTC, updateQueryParamsAC} from '../packs-reducer';
import {useAppSelector} from '../../../common/hooks/useAppSelector';

export const Settings = () => {
    const dispatch = useAppDispatch()
    const searchHandler = useCallback((packName: string) => {
        dispatch(updateQueryParamsAC({packName}))
    }, [])


    return (
        <div className={styles.wrapper}>
            <Search id={'cardPacksSearch'} callback={searchHandler}/>
            <OwnerSwitcher/>
            <CardsSlider/>
            <DisableFilter/>
        </div>
    );
};

