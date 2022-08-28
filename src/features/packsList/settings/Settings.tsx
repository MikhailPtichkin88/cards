import React from 'react';
import styles from './Settings.module.css';
import {Search} from "./search/Search";
import {OwnerSwitcher} from "./ownerSwitcher/OwnerSwitcher";
import {CardsSlider} from "./cardsSlider/CardsSlider";
import {DisableFilter} from "./disableFilter/DisableFilter";

export const Settings = () => {
    return (
        <div className={styles.wrapper}>
            <Search id={"cardPacksSearch"}/>
            <OwnerSwitcher/>
            <CardsSlider/>
            <DisableFilter/>
        </div>
    );
};

