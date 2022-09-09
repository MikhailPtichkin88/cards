import React, {ChangeEvent, ReactNode, useState} from 'react';
import {CustomModal} from '../CustomModal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box/Box';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import commonStyle from '../../../../common/style/style.module.css';
import {ButtonModal} from '../ButtonModal';


export const EditAddModalCard: React.FC<EditAddModalCardType> = (props) => {

    const [valueQuestion, setValueQuestion] = useState(props.valueQuestion)
    const [valueAnswer, setValueAnswer] = useState(props.valueAnswer)

    const [errorQuestion, setErrorQuestion] = useState(false)
    const [errorAnswer, setErrorAnswer] = useState(false)

    const [valueSelect, setValueSelect] = React.useState('text');

    const handleChange = (event: SelectChangeEvent) => {
        setValueSelect(event.target.value as string);
    }
    const onChangeValueQuestion = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        if (value.trim() !== '') {
            setErrorQuestion(false)
            setValueQuestion(value)
        }
    }
    const onChangeValueAnswer = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        if (value.trim() !== '') {
            setErrorAnswer(false)
            setValueAnswer(value)
        }
    }
    const setDataOnClose = () => {
        setValueAnswer(props.valueAnswer)
        setValueQuestion(props.valueQuestion)
        setErrorQuestion(false)
        setErrorAnswer(false)
    }


    const onClickSaveHandler = () => {
        if (!valueQuestion) {
            return setErrorQuestion(true)
        } else if (!valueAnswer) {
            return setErrorAnswer(true)
        }
        props.saveCallback([valueQuestion, valueAnswer])
        setDataOnClose()
    }


    return (
        <>
            <CustomModal childrenDiv={props.childrenDiv}
                         title={props.title}
                         setDataOnClose={setDataOnClose}
                         onClickSaveHandler={onClickSaveHandler}
                         deleteStyle={false}>
                <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>

                    <InputLabel id="demo-simple-select-label">Choose a question format</InputLabel>

                    <Select
                        sx={{mb: 4}}
                        value={valueSelect}
                        onChange={handleChange}>

                        <MenuItem value={'text'}>Text</MenuItem>
                        <MenuItem value={'img'}>IMG</MenuItem>

                    </Select>

                    <TextField label="Question"
                               variant="standard"
                               multiline
                               maxRows={7}
                               value={valueQuestion}
                               onChange={onChangeValueQuestion}
                               error={errorQuestion}
                               helperText={errorQuestion && 'Empty field'}
                               className={commonStyle.textFieldModal}/>

                    <TextField label="Answer"
                               variant="standard"
                               multiline
                               maxRows={7}
                               value={valueAnswer}
                               onChange={onChangeValueAnswer}
                               error={errorAnswer}
                               helperText={errorAnswer && 'Empty field'}
                               className={commonStyle.textFieldModal}/>

                </Box>

                {/*<ButtonModal onClickSaveHandler={onClickSaveHandler}*/}
                {/*             handleClose={handleClose}/>*/}

            </CustomModal>
        </>
    );
};
//type
type EditAddModalCardType = {
    childrenDiv: ReactNode
    title: string
    valueQuestion?: string
    valueAnswer?: string
    saveCallback: ([]: string[]) => void
};

