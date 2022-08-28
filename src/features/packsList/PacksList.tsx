import React from 'react';
import styles from './PackList.module.css';
import {PacksTitle} from "./packsTitle/PacksTitle";
import {Settings} from "./settings/Settings";
import {CardsTable} from "./table/Table";

export const PacksList = () => {
    return (
        <div className={styles.wrapper}>
            <PacksTitle title={"Packs list"}
                        btnName={"Add new pack"}
                        callback={() => {
            }}/>
            <Settings/>
            <CardsTable/>

        </div>
    );
};

