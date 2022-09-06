import React, {ChangeEvent, ReactNode, useState} from 'react';
import {CustomModal} from '../CustomModal';
import TextField from '@mui/material/TextField';
import {Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import Button from '@mui/material/Button';
import commonStyle from '../../../../common/style/style.module.css'

// export const btnBlockStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignCenter: 'center',
//     gap: '100px',
// }

type AddEditPackModalType = {
    title: string
    name?: string
    childrenDiv: ReactNode
    saveCallback: (name: string) => void
}

export const AddEditModalPack: React.FC<AddEditPackModalType> = ({
                                                                     title,
                                                                     name,
                                                                     saveCallback,
                                                                     childrenDiv
                                                                 }) => {
    const [value, setValue] = useState(name)
    const [error, setError] = useState(false)
    const [close, setClose] = useState(false)
    const [isPrivate, setIsPrivate] = useState(false)

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError(false)
        setValue(e.currentTarget.value)
    }
    const onChangeIsPrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.currentTarget.checked)
    }
    const handleClose = () => {
        setClose(true)
    }
    const onClickSaveHandler = async () => {
        if (!value) {
            return setError(true)
        }
        await saveCallback(value)
        handleClose()
    }

    return (
        <CustomModal title={title}
                     childrenDiv={childrenDiv}
                     isClose={close}
                     setClose={setClose}
        >
            <TextField id="standard-basic"
                       label="Name pack"
                       variant="standard"
                       value={value}
                       onChange={onChangeValueHandler}
                       error={error}
                       helperText={error && 'Empty field'}
                       style={{marginBottom: '30px'}}/>
            <FormGroup style={{marginBottom: '35px'}}>
                <FormControlLabel label="Private pack" control={
                    <Checkbox checked={isPrivate}
                              onChange={onChangeIsPrivateHandler}/>}/>
            </FormGroup>
            <div className={commonStyle.modalBtnBlock}>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button variant="contained" onClick={onClickSaveHandler}>Save</Button>
            </div>
        </CustomModal>
    );
};
