import React from 'react';
import bgImg from '../../../../assets/images/filter.svg'
import styles from './DisableFilter.module.css';


export const DisableFilter = () => {
    return (
        <div>
            <button className={styles.btn}
                    style={{backgroundImage: `url(${bgImg}`}}
            ></button>
        </div>
    );
};

