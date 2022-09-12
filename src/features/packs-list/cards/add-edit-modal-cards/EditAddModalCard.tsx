import React, {ChangeEvent, ReactNode, useState} from 'react';
import {CustomModal} from '../../../../common/components/modals/CustomModal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box/Box';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import commonStyle from '../../../../common/style/style.module.css';
import Button from '@mui/material/Button/Button';
import {convertFileToBase64} from '../../../../common/utils/convert-base64';
import {CreateCardType} from '../cards-api';
import style from './EditAddModalCard.module.css'
import common from '../../../../common/style/style.module.css';


export const EditAddModalCard: React.FC<EditAddModalCardType> = (props) => {

    const [valueQuestion, setValueQuestion] = useState(props.valueQuestion)
    const [valueAnswer, setValueAnswer] = useState(props.valueAnswer)

    const [errorQuestion, setErrorQuestion] = useState(false)
    const [errorAnswer, setErrorAnswer] = useState(false)

    const [valueSelect, setValueSelect] = React.useState(props.valueQuestion ? 'img' : 'text');
    const [isClosed, setIsClosed] = React.useState(false);

    const [nameFileImg, setNameFileImg] = React.useState('');
    const [questionImg, setQuestionImg] = React.useState('');

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
        setNameFileImg('')
    }


    const onClickSaveHandler = async () => {
        if (!valueQuestion && valueSelect === 'text') {
            return setErrorQuestion(true)
        } else if (!valueAnswer) {
            return setErrorAnswer(true)
        }
        await props.saveCallback({question: valueQuestion, answer: valueAnswer, questionImg})
        setDataOnClose()
        setIsClosed(true)
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            if (e.target.files[0].size / 1024 <= 4096) {
                const file = e.target.files[0]
                setNameFileImg(file.name)
                convertFileToBase64(file, (file64) => {
                    setQuestionImg(file64)
                })
            }
        }
    };


    return (
        <>
            <CustomModal childrenDiv={props.childrenBtn}
                         title={props.title}
                         setDataOnClose={setDataOnClose}
                         onClickSaveHandler={onClickSaveHandler}
                         deleteStyle={false}
                         isClosed={isClosed}>
                <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>

                    {props.questionImg
                        ? <img src={props.questionImg}
                               alt="questionImg"
                        />
                        : <div>
                            <InputLabel id="demo-simple-select-label">Choose a question format</InputLabel>

                            <Select
                                sx={{mb: 4}}
                                value={valueSelect}
                                onChange={handleChange}>

                                <MenuItem value={'text'}>Text</MenuItem>
                                <MenuItem value={'img'}>IMG</MenuItem>

                            </Select>
                        </div>

                    }


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
                        : <label>
                            <input type="file"
                                   accept="image/*"
                                   onChange={uploadHandler}
                                   style={{display: 'none'}}
                            />
                            <Box className={style.uploadBlock}>
                                <Button className={style.uploadBtn} variant="contained" component="span">
                                    Upload button
                                </Button>
                                <span className={style.nameImg}>{nameFileImg}</span>
                            </Box>
                        </label>
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
    childrenBtn: ReactNode
    title: string
    valueQuestion?: string
    valueAnswer?: string
    questionImg?: string
    saveCallback: ({}: CreateCardType) => void
};


