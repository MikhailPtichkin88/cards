import React from 'react';
import styles from './PackList.module.css';
import {PacksTitle} from "./packsTitle/PacksTitle";
import {Settings} from "./settings/Settings";
import {CardsTable} from "./table/Table";
import {NavLink} from "react-router-dom";
import {routePath} from "../../common/constants/routePath";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {addNewPackTC} from "./packs-reducer";

export const PacksList = () => {

    const dispatch = useAppDispatch()

    const addNewPack = ()=>{
        dispatch(addNewPackTC({name:new Date().getMinutes().toString()}))
    }
    return (
        <div className={styles.wrapper}>
            <PacksTitle title={"Packs list"}
                        btnName={"Add new pack"}
                        callback={addNewPack}/>
            <Settings/>
            <CardsTable/>
            <NavLink to={routePath.cards.newPack}>NewPack page sample</NavLink>
        </div>
    );
};

