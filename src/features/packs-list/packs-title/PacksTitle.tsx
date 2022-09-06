import React, {ReactNode} from 'react';
import styles from './PacksTitle.module.css';

type PacksTitlePropsType = {
    title: string
    isMy?: boolean
    children: ReactNode
}

export const PacksTitle = ({isMy = true, ...props}: PacksTitlePropsType) => {

    return (
        <div className={styles.titleWrapper}>
            <h2 className={styles.title}>{props.title}</h2>
            {isMy && props.children}
        </div>
    );
};

