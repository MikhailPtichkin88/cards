import React, {ChangeEvent, ReactNode, useState} from 'react';
import {CustomModal} from '../../../../common/components/modals/CustomModal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box/Box';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import commonStyle from '../../../../common/style/style.module.css';
import Button from '@mui/material/Button/Button';


export const EditAddModalCard: React.FC<EditAddModalCardType> = (props) => {

    const [valueQuestion, setValueQuestion] = useState(props.valueQuestion)
    const [valueAnswer, setValueAnswer] = useState(props.valueAnswer)

    const [errorQuestion, setErrorQuestion] = useState(false)
    const [errorAnswer, setErrorAnswer] = useState(false)

    const [valueSelect, setValueSelect] = React.useState('text');
    const [isClosed, setIsClosed] = React.useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setValueSelect(event.target.value as string);
    }
    const onChangeValueQuestion = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        setErrorQuestion(false)
        setValueQuestion(value)

    }
    const onChangeValueAnswer = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        setErrorAnswer(false)
        setValueAnswer(value)
    }
    const setDataOnClose = () => {
        setValueAnswer(props.valueAnswer)
        setValueQuestion(props.valueQuestion)
        setErrorQuestion(false)
        setErrorAnswer(false)
        setIsClosed(false)
    }


    const onClickSaveHandler = async () => {
        if (!valueQuestion) {
            return setErrorQuestion(true)
        } else if (!valueAnswer) {
            return setErrorAnswer(true)
        }
        await props.saveCallback([valueQuestion, valueAnswer])
        setDataOnClose()
        setIsClosed(true)
    }


    return (
        <>
            <CustomModal childrenDiv={props.childrenDiv}
                         title={props.title}
                         setDataOnClose={setDataOnClose}
                         onClickSaveHandler={onClickSaveHandler}
                         deleteStyle={false}
                         isClosed={isClosed}>
                <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>

                    <InputLabel id="demo-simple-select-label">Choose a question format</InputLabel>

                    <Select
                        sx={{mb: 4}}
                        value={valueSelect}
                        onChange={handleChange}>

                        <MenuItem value={'text'}>Text</MenuItem>
                        <MenuItem value={'img'}>IMG</MenuItem>

                    </Select>


                    {valueSelect === 'text'
                        ? <TextField label="Question"
                                     variant="standard"
                                     multiline
                                     maxRows={7}
                                     value={valueQuestion}
                                     onChange={onChangeValueQuestion}
                                     error={errorQuestion}
                                     helperText={errorQuestion && 'Empty field'}
                                     className={commonStyle.textFieldModal}/>
                        : <Button variant="contained">Change cover</Button>
                    }

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

