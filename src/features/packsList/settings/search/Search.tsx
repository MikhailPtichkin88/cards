import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './Search.module.css';
import {useDebounce} from '../../../../common/hooks/useDebounce';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';

type SearchPropsType = {
    id: string
    callback: (value: string) => void
}

export const Search = React.memo((props: SearchPropsType) => {
        const [value, setValue] = useState<string>('')
        const debouncedValue = useDebounce<string>(value, 500)

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
        }

        useEffect(() => {
                props.callback(value)
            }
            ,
            [debouncedValue]
        )

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
    })
;
