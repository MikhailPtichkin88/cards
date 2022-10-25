import React, {useEffect, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import Paper from "@mui/material/Paper/Paper";
import {useAppSelector} from "../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {fetchCards, setQueryParams, updateCardGradeTC} from "../packs-list/cards/cards-reducer";
import {CardType} from "../packs-list/cards/cards-api";
import Button from "@mui/material/Button/Button";
import style from './LearnCards.module.css'
import Grid from "@mui/material/Grid/Grid";
import {FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import FormControl from "@mui/material/FormControl/FormControl";
import {routePath} from "../../common/constants/routePath";
import {setAppErrorAC} from "../../app/app-reducer";
import {BackToPacksLink} from "../../common/components/back-to-packs-link/BackToPacksLink";

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];
const initObj = {
    _id: '',
    cardsPack_id: '',
    answer: 'answer fake',
    question: 'question fake',

    grade: 0,
    shots: 0,

    created: '',
    updated: '',

    type: '',
    rating: 0,
    more_id: '',

    user_id: '',
    comments: '',

    __v: 0,
}

const getCard = (cards: CardType[]) => {

    const sum = cards.reduce((acc, card) => {
        if (card.grade !== undefined) return acc + (6 - card.grade) * (6 - card.grade)
        else return 0
    }, 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            if (card.grade !== undefined) {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            } else {
                return {sum: 0, id: 0}
            }
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}

export const LearnCards = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [value, setValue] = useState(0)
    const [first, setFirst] = useState<boolean>(true);
    const [card, setCard] = useState<CardType>(initObj);

    const {id} = useParams()

    const dispatch = useAppDispatch()

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const cards = useAppSelector(state => state.cards.dateCard.cards)
    const packName = useAppSelector(state => state.cards.dateCard.packName)

    useEffect(() => {

        if (first) {
            dispatch(setQueryParams({cardsPack_id: id}))
            dispatch(fetchCards())
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards));

    }, [dispatch, id, cards, first]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(event.target.value));

    }
    const handleSubmit = () => {
        if (value !== 0) {
            setIsChecked(false);

            if (cards.length > 0) {
                dispatch(updateCardGradeTC({grade: value, card_id: card._id}))
                setCard(getCard(cards));
                setValue(0)
            }
        } else {
            dispatch(setAppErrorAC("Please answer the question"))
        }
    }
    const formControlLabels = grades.map((g, i) => (
        <FormControlLabel value={i + 1}
                          control={<Radio/>}
                          key={'grade-' + i}
                          label={g}/>))
    if (!isAuth) {
        return <Navigate to={routePath.auth.login}/>
    }
    return (<>
            <BackToPacksLink/>
            <Paper elevation={20} className={style.paperStyle}>
                <Grid container spacing={0} direction={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Grid item>
                        <Typography mb={5} variant="h5">
                            Learn: {packName}
                        </Typography>
                    </Grid>
                    {
                        card.questionImg
                            ? <Grid item alignSelf={"center"} style={{marginBottom: "10px"}}>
                                <img src={card.questionImg} alt="question picture"
                                     style={{width: "320px", objectFit: "cover"}}/>
                            </Grid>
                            : <Grid item alignSelf={"start"}>
                                <Typography mb={4} variant="body1" sx={{alignItems: "start"}}>
                                    <b>Question:</b> {card.question}
                                </Typography>
                            </Grid>
                    }
                    {
                        !isChecked &&
                        <Grid item>
                            <Button variant={"contained"} onClick={() => setIsChecked(true)}>
                                Show answer
                            </Button>
                        </Grid>
                    }
                    {isChecked && (
                        <>
                            {
                                card.answerImg
                                    ? <img src={card.answerImg} style={{width: "320px", objectFit: "cover"}}
                                           alt="answer"/>
                                    : <Grid item alignSelf={"start"}>
                                        <Typography mb={3} variant="body1" sx={{alignItems: "start"}}>
                                            <b>Answer:</b> {card.answer}
                                        </Typography>
                                    </Grid>
                            }
                            <form style={{marginBottom:"20px"}}>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        onChange={handleChange}
                                    >
                                        {formControlLabels}
                                    </RadioGroup>
                                </FormControl>
                            </form>
                        </>
                    )}
                    {isChecked && <Button variant={"contained"} onClick={handleSubmit}>next</Button>}
                </Grid>
            </Paper>
        </>
    );
};

