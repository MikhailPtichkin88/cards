import React from 'react';
import bgImg from '../../../../assets/images/filter.svg'
import styles from './DisableFilter.module.css';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {filterPacksWithOwnerSwitcherAC} from '../../packs-reducer';

type DisableFilterType = {
    setClearFilter: (value: boolean) => void
    isLoading?:boolean
}

export const DisableFilter = (props: DisableFilterType) => {
    const dispatch = useAppDispatch()

    const onClickDisableFilter = () => {
        dispatch(filterPacksWithOwnerSwitcherAC('all'))
        props.setClearFilter(true)
    }

    const studyBtnClasses= props.isLoading?`${styles.btn} ${styles.btnDisabled}`:`${styles.btn}`
    return (
        <div>
            <button className={studyBtnClasses}
                    onClick={onClickDisableFilter}
                    style={{backgroundImage: `url(${bgImg}`}}
                    disabled={props.isLoading}
            />
        </div>
    );
};

