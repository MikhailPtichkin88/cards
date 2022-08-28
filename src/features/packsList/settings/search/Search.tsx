import React from 'react';
import styles from './Search.module.css';

type SearchPropsType = {
    id:string
}

export const Search = (props:SearchPropsType) => {

    return (
        <form className={styles.form}>
            <label className={styles.label} htmlFor={props.id}>Search</label>
            <input placeholder="Provide your text" className={styles.input} type="text" id={props.id}/>
        </form>
    );
};
