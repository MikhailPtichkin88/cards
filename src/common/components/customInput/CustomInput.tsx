import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import styles from './CustomInput.module.css'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    label?: string
    value: string
}

export const CustomInput: React.FC<SuperInputTextPropsType> = (
    {
        value,
        label,
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        children,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter()
    }
    const onClickSaveHandler = () => {
        onChangeText && onChangeText(value)
    }
    const finalSpanClassName = `${styles.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${error ? styles.error : ''} ${styles.input} ${className}`

    return (
        <div className={styles.fieldOuter}>

            <input
                value={value}
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}

                {...restProps}
            />
            <label className={styles.label} htmlFor={label}>{label}</label>
            {error && <span className={finalSpanClassName}>{error}</span>}
            <button className={styles.saveBtn}
                    onClick={onClickSaveHandler}
            >save
            </button>
        </div>
    )
}
