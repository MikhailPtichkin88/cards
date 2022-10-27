import React from 'react';
import styles from './OwnerSwitcher.module.css';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {filterPacksWithOwnerSwitcherAC, OwnerSwitcherType} from '../../packs-reducer';
import {styleDisabled} from "../Settings";

type OwnerSwitcherPropsType={
    isLoading?:boolean
}

export const OwnerSwitcher = React.memo((props:OwnerSwitcherPropsType) => {

    const filter = useAppSelector(state => state.packs.filters.ownerSwitcher)
    const dispatch = useAppDispatch()
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        dispatch(filterPacksWithOwnerSwitcherAC(newAlignment as OwnerSwitcherType));
    };
    const disabledLabelStyles = props.isLoading ? styleDisabled : {}
    return (
        <div className={styles.wrapper}>
            <h4 className={styles.title} style={disabledLabelStyles}>Show card packs</h4>
            <ToggleButtonGroup
                size="small"
                color="primary"
                value={filter}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton style={{padding: '5px 40px'}} value="my" disabled={props.isLoading}>My</ToggleButton>
                <ToggleButton style={{padding: '5px 40px'}} value="all" disabled={props.isLoading}>All</ToggleButton>

            </ToggleButtonGroup>
        </div>
    );
});

