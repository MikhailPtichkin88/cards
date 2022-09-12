import React, {ReactNode} from 'react';
import styles from './PacksTitle.module.css';
import {useAppSelector} from "../../../common/hooks/useAppSelector";

type PacksTitlePropsType = {
    title: string
    packId?: string | undefined | null
    isMy?: boolean
    children: ReactNode
}

export const PacksTitle = ({isMy = true, ...props}: PacksTitlePropsType) => {

    const title = useAppSelector(state => state.packs.packs.cardPacks.find(pack => pack._id === props.packId))
    const titleName = title ? title.name : props.title

    return (
        <div className={styles.titleWrapper}>
            <h2 className={styles.title}>{titleName}</h2>
            {isMy && props.children}
        </div>
    );
};

