import React, {useEffect, useState} from 'react';
import styles from './OwnerSwitcher.module.css';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {filterPacksWithOwnerSwitcherAC, getPacksTC, OwnerSwitcherType} from "../../packs-reducer";

export const OwnerSwitcher = () => {

    const myID = useAppSelector(state => state.auth.authData._id)
    const filter = useAppSelector(state => state.packs.filters.ownerSwitcher)
    const dispatch = useAppDispatch()
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        dispatch(filterPacksWithOwnerSwitcherAC(newAlignment as OwnerSwitcherType));
    };

    useEffect(() => {
        if(filter==="my"){
            dispatch(getPacksTC({user_id:myID}))
        }else{
            dispatch(getPacksTC({user_id:undefined}))
        }
    }, [filter])

    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title}>Show packs cards</h4>
            <ToggleButtonGroup
                size="small"
                color="primary"
                value={filter}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton style={{padding: "5px 40px"}} value="my">My</ToggleButton>
                <ToggleButton style={{padding: "5px 40px"}} value="all">All</ToggleButton>

            </ToggleButtonGroup>
        </div>
    );
};

