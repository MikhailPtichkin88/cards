import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './Search.module.css';
import {useDebounce} from '../../../../common/hooks/useDebounce';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {getPacksTC} from '../../packs-reducer';

type SearchPropsType = {
    id: string
}

export const Search = (props: SearchPropsType) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 500)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        console.log('запрос')
        dispatch(getPacksTC({user_id: '6303bab7b26aed04b4f65bb7'}))
    }, [debouncedValue])

    return (
        <form className={styles.form}>
            <label className={styles.label} htmlFor={props.id}>Search</label>
            <input placeholder="Provide your text"
                   className={styles.input}
                   type="text"
                   id={props.id}
                   onChange={handleChange}
            />
        </form>
    );
};
