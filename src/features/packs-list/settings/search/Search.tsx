import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './Search.module.css';
import {useDebounce} from '../../../../common/hooks/useDebounce';
import {styleDisabled} from "../Settings";

type SearchPropsType = {
    id: string
    valueSearch: string | undefined
    clearFilter?: boolean
    callback: (value: string) => void
    isLoading?: boolean
}

export const Search = React.memo((props: SearchPropsType) => {
        const [value, setValue] = useState<string>(props.valueSearch ? props.valueSearch : '')
        const debouncedValue = useDebounce<string>(value, 1000)

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
        }
        const disabledLabelStyles = props.isLoading ? styleDisabled : {}
        useEffect(() => {
            if (props.valueSearch !== value) {
                props.callback(value)
            }
        }, [debouncedValue])

        useEffect(() => {
            setValue('')
        }, [props.clearFilter])

        return (
            <form className={styles.form}>
                <label className={styles.label}
                       style={disabledLabelStyles}
                       htmlFor={props.id}>Search</label>
                <input placeholder="Provide your text"
                       value={value}
                       className={styles.input}
                       type="text"
                       id={props.id}
                       onChange={handleChange}
                       disabled={props.isLoading}
                />
            </form>
        );
    })
;
