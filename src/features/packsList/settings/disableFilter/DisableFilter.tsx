import React from 'react';
import bgImg from '../../../../assets/images/filter.svg'
import styles from './DisableFilter.module.css';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {filterPacksWithOwnerSwitcherAC} from '../../packs-reducer';

type DisableFilterType = {
    setClearFilter: (value: boolean) => void
}

export const DisableFilter = (props: DisableFilterType) => {
    const dispatch = useAppDispatch()

    const onClickDisableFilter = () => {
        dispatch(filterPacksWithOwnerSwitcherAC('all'))
        props.setClearFilter(true)
    }

    return (
        <div>
            <button className={styles.btn}
                    onClick={onClickDisableFilter}
                    style={{backgroundImage: `url(${bgImg}`}}
            />
        </div>
    );
};

