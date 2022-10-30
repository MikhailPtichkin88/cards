import React, {ChangeEvent, ReactNode, useState} from 'react';
import {CustomModal} from '../../../common/components/modals/CustomModal';
import TextField from '@mui/material/TextField';
import {Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import commonStyle from '../../../common/style/style.module.css'
import Box from "@mui/material/Box/Box";
import style from "../cards/add-edit-modal-cards/EditAddModalCard.module.css";
import Button from "@mui/material/Button/Button";
import {convertFileToBase64} from "../../../common/utils/convert-base64";
import {setAppErrorAC} from "../../../app/app-reducer";
import {useAppDispatch} from "../../../common/hooks/useAppDispatch";
import useMediaQuery from '@mui/material/useMediaQuery';


type AddEditPackModalType = {
    title: string
    name?: string
    deckCover?: string
    childrenDiv: ReactNode
    saveCallback: (name: string, deckCover: string) => void
}

export const EditAddModalPack: React.FC<AddEditPackModalType> = (props) => {
    const [value, setValue] = useState(props.name)
    const [deckCover, setDeckCover] = useState(props.deckCover)
    const [nameFileImg, setNameFileImg] = useState('');
    const [error, setError] = useState(false)
    const [isClosed, setIsClosed] = React.useState(false);
    const [isPrivate, setIsPrivate] = useState(false)

    const dispatch = useAppDispatch()

    const matches = useMediaQuery('(min-width:991px)');

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
        setIsClosed(false)
    }
    const onClickSaveHandler = async () => {
        if (!value) {
            return setError(true)
        }
        await props.saveCallback(value, deckCover!)
        setDataOnClose()
        setIsClosed(true)
    }

    const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            if (e.target.files[0].size / 1024 <= 409) {
                const file = e.target.files[0]
                setNameFileImg(file.name)
                convertFileToBase64(file, (file64) => {
                    setDeckCover(file64)
                })
            } else {
                dispatch(setAppErrorAC('Incorrect file size (must be less than 400 Kb'))
                setDeckCover('')
            }
        }
    }

    const deckCoverStyle = {
        maxHeight: 150,
        objectFit: "cover" as "cover",
    }
    const wrapperStyle = {
        display: "flex",
        justifyContent: "center"
    }
    const uploadBtnStyle = {
        margin: "0 auto",
        borderRadius: "24px",
    }
    return (
        <CustomModal title={props.title}
                     childrenDiv={props.childrenDiv}
                     setDataOnClose={setDataOnClose}
                     onClickSaveHandler={onClickSaveHandler}
                     deleteStyle={false}
                     isClosed={isClosed}>

            {deckCover && <div style={wrapperStyle}>
                <img src={deckCover} style={{...deckCoverStyle, width:`${matches?"450px":"250px"}`}}/>
            </div>
            }

            <label>
                <input type="file"
                       accept="image/*"
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                />
                <Box className={style.uploadBlock}>
                    <Button style={uploadBtnStyle} className={style.uploadBtn} variant="contained" component="span">
                        Upload cover
                    </Button>
                    <span className={style.nameImg}>{nameFileImg}</span>
                </Box>
            </label>

            <TextField label="Name pack"
                       variant="standard"
                       multiline
                       maxRows={7}
                       value={value}
                       onChange={onChangeValueHandler}
                       error={error}
                       helperText={error && 'Empty field'}
                       className={commonStyle.textFieldModal}/>

            <FormGroup style={{marginBottom: '15px'}}>

                <FormControlLabel label="Private pack" control={
                    <Checkbox checked={isPrivate}
                              onChange={onChangeIsPrivateHandler}/>}/>
            </FormGroup>

        </CustomModal>
    );
};
