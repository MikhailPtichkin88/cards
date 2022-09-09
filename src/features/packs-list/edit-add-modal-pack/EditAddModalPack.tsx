import React, {ChangeEvent, ReactNode, useState} from 'react';
import {CustomModal} from '../../../common/components/modals/CustomModal';
import TextField from '@mui/material/TextField';
import {Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import commonStyle from '../../../common/style/style.module.css'
import {ButtonModal} from '../../../common/components/modals/ButtonModal';

type AddEditPackModalType = {
    title: string
    name?: string
    childrenDiv: ReactNode
    saveCallback: (name: string) => void
}

export const EditAddModalPack: React.FC<AddEditPackModalType> = (props) => {
    const [value, setValue] = useState(props.name)
    const [error, setError] = useState(false)
    const [isPrivate, setIsPrivate] = useState(false)

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        if (value.trim() !== '') {
            setError(false)
            setValue(e.currentTarget.value)
        }
    }
    const onChangeIsPrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.currentTarget.checked)
    }
    const setDataOnClose = () => {
        setValue(props.name)
        setError(false)
    }
    const onClickSaveHandler = () => {
        if (!value) {
            return setError(true)
        }
        props.saveCallback(value)
        setDataOnClose()
    }

    return (
        <CustomModal title={props.title}
                     childrenDiv={props.childrenDiv}
                     setDataOnClose={setDataOnClose}
                     onClickSaveHandler={onClickSaveHandler}
                     deleteStyle={false}>

            <TextField label="Name pack"
                       variant="standard"
                       multiline
                       maxRows={7}
                       value={value}
                       onChange={onChangeValueHandler}
                       error={error}
                       helperText={error && 'Empty field'}
                       className={commonStyle.textFieldModal}/>

            <FormGroup style={{marginBottom: '35px'}}>

                <FormControlLabel label="Private pack" control={
                    <Checkbox checked={isPrivate}
                              onChange={onChangeIsPrivateHandler}/>}/>
            </FormGroup>

        </CustomModal>
    );
};
