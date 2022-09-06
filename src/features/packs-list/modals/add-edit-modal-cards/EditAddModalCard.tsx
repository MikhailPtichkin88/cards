import React, {ChangeEvent, ReactNode, useState} from 'react';
import {CustomModal} from '../CustomModal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box/Box';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import Button from '@mui/material/Button';
import commonStyle from '../../../../common/style/style.module.css';


type EditAddModalCardType = {
    childrenDiv: ReactNode
    title: string
    valueQuestion?: string
    valueAnswer?: string
    saveCallback: ([]: string[]) => void
};
export const EditAddModalCard: React.FC<EditAddModalCardType> = (props) => {

    const [valueQuestion, setValueQuestion] = useState(props.valueQuestion)
    const [valueAnswer, setValueAnswer] = useState(props.valueAnswer)
    const [errorQuestion, setErrorQuestion] = useState(false)
    const [errorAnswer, setErrorAnswer] = useState(false)
    const [close, setClose] = useState(false)

    const [valueSelect, setValueSelect] = React.useState('text');
    const handleChange = (event: SelectChangeEvent) => {
        setValueSelect(event.target.value as string);
    };

    const onChangeValueQuestion = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorQuestion(false)
        setValueQuestion(e.currentTarget.value)
    }
    const onChangeValueAnswer = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorAnswer(false)
        setValueAnswer(e.currentTarget.value)
    }
    const handleClose = () => {
        setClose(true)
    }
    const onClickSaveHandler = async () => {
        if (!valueQuestion) {
            return setErrorQuestion(true)
        } else if (!valueAnswer) {
            return setErrorAnswer(true)
        }
        await props.saveCallback([valueQuestion, valueAnswer])
        handleClose()
    }


    return (
        <>
            <CustomModal childrenDiv={props.childrenDiv}
                         title={props.title}
                         isClose={close}
                         setClose={setClose}>
                <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                    <InputLabel id="demo-simple-select-label">Choose a question format</InputLabel>
                    <Select
                        sx={{mb: 4}}
                        value={valueSelect}
                        onChange={handleChange}
                    >
                        <MenuItem value={'text'}>Text</MenuItem>
                        <MenuItem value={'img'}>IMG</MenuItem>
                    </Select>
                    <TextField id="standard-basic"
                               label="Question"
                               variant="standard"
                               value={valueQuestion}
                               onChange={onChangeValueQuestion}
                               error={errorQuestion}
                               helperText={errorQuestion && 'Empty field'}
                               style={{marginBottom: '30px'}}/>
                    <TextField id="standard-basic"
                               label="Answer"
                               variant="standard"
                               value={valueAnswer}
                               onChange={onChangeValueAnswer}
                               error={errorAnswer}
                               helperText={errorAnswer && 'Empty field'}
                               style={{marginBottom: '30px'}}/>
                </Box>
                <div className={commonStyle.modalBtnBlock}>
                    <Button onClick={handleClose} variant="outlined">Cancel</Button>
                    <Button variant="contained" onClick={onClickSaveHandler}>Save</Button>
                </div>
            </CustomModal>
        </>
    );
};

