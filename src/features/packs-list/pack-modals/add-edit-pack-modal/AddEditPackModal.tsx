import React, {ChangeEvent, useState} from 'react';
import {CustomModal} from "../CustomModal";
import TextField from "@mui/material/TextField";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {ShowModalType} from "../../table/table-row/CustomTableRow";

export const btnBlockStyle = {
    display:"flex",
    justifyContent:"center",
    alignCenter:"center",
    gap:"100px",
}

type AddEditPackModalType = {
    open: ShowModalType
    handleClose: () => void
    title: string
    packName: string
    saveCallback: (name: string) => void
}

export const AddEditPackModal: React.FC<AddEditPackModalType> = ({
                                                                     open,
                                                                     handleClose,
                                                                     title,
                                                                     packName,
                                                                     saveCallback
                                                                 }) => {
    const [value, setValue] = useState(packName)
    const [error, setError] = useState(false)
    const [isPrivate, setIsPrivate] = useState(false)

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError(false)
        setValue(e.currentTarget.value)
    }
    const onChangeIsPrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.currentTarget.checked)
    }
    const onClickSaveHandler = async () => {
        if (!value) {
            return setError(true)
        }
        await saveCallback(value)
        handleClose()
    }

    return (
        <CustomModal title={title} open={open==="add" || open==="edit"} handleClose={handleClose}>
            <TextField id="standard-basic"
                       label="Name pack"
                       variant="standard"
                       value={value}
                       onChange={onChangeValueHandler}
                       error={error}
                       helperText={error && "Empty field"}
                       style={{marginBottom: "30px"}}/>
            <FormGroup style={{marginBottom: "35px"}}>
                <FormControlLabel label="Private pack" control={
                    <Checkbox checked={isPrivate}
                              onChange={onChangeIsPrivateHandler}/>}/>
            </FormGroup>
            <div style={btnBlockStyle}>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button variant="contained" onClick={onClickSaveHandler}>Save</Button>
            </div>
        </CustomModal>
    );
};
