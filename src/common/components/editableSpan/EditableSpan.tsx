import React, {DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState, ChangeEvent} from 'react'

import styles from './EditableSpan.module.css'
import {CustomInput} from "../customInput/CustomInput";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>


type EditableSpanType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    label: string
    spanProps?: DefaultSpanPropsType
    value:string
}

export const EditableSpan: React.FC<EditableSpanType> = (
    {
        value,
        onChangeText,
        label,
        autoFocus,
        onBlur,
        onEnter,
        spanProps,

        ...restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [text, setText] = useState(value)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

    const onEnterCallback = () => {
        setEditMode(false) // выключить editMode при нажатии Enter
        onEnter && onEnter()
        if (text)
            onChangeText && onChangeText(text)
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false) // выключить editMode при нажатии за пределами инпута
        onBlur && onBlur(e)
        if (text)
            onChangeText && onChangeText(text)
    }
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true) // включить editMode при двойном клике

        onDoubleClick && onDoubleClick(e)
    }

    const spanClassName = `${styles.span} ${className}`
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    return (
        <>
            {editMode
                ? (
                    <CustomInput
                        label={label}
                        value={text}
                        autoFocus
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}
                        onChange={onChangeHandler}
                        {...restProps}
                    />
                ) : (
                    <span
                        onDoubleClick={onDoubleClickCallBack}
                        className={spanClassName}

                        {...restSpanProps}
                    >
                        {children || value}
                    </span>
                )
            }
        </>
    )
}

