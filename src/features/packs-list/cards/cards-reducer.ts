import {
    CardsApi,
    CardType,
    DataCreateCardType,
    QueryParamsCardType,
    ResponseGateCardType, UpdateCardGradeDataType, UpdateCardGradeResponseType,
    UpdateData
} from './cards-api';
import {AppThunk, RootState} from '../../../app/store';
import {setAppStatusAC} from '../../../app/app-reducer';
import {handleServerNetworkError} from '../../../common/utils/error-utils';
import {AxiosError} from 'axios';

const initState: InitStateType = {
    queryCardParams: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: null,
        min: null,
        max: null,
        sortCards: null,
        page: 1,
        pageCount: 10,
    },
    dateCard: {
        cards: [] as unknown as CardType,
    } as unknown as ResponseGateCardType,
}

export const cardsReducer = (state = initState, action: CardReducerActionType): InitStateType => {
    switch (action.type) {
        case 'CARD/SET-QUERY-PARAMS':
            return {...state, queryCardParams: {...state.queryCardParams, ...action.params}}
        case 'CARD/SET-DATE-CARD':
            return {...state, dateCard: action.date}
        case "CARD/UPDATE-CARD-GRADE":
            const newGrade = action.updatedCard.grade
            const newShots = action.updatedCard.shots
            return {
                ...state,
                dateCard: {
                    ...state.dateCard,
                    cards: state.dateCard.cards.map(el => el._id === action.updatedCard._id ? {
                        ...el,
                        grade: newGrade,
                        shots: newShots
                    } : el)
                }
            }
        default :
            return state
    }
}
//action
export const updateCardGrade = (updatedCard: UpdateCardGradeResponseType) =>
    ({type: 'CARD/UPDATE-CARD-GRADE', updatedCard}) as const
export const setQueryParams = (params: QueryParamsCardType) =>
    ({type: 'CARD/SET-QUERY-PARAMS', params} as const)
export const setDateCard = (date: ResponseGateCardType) =>
    ({type: 'CARD/SET-DATE-CARD', date} as const)
//thunk
export const fetchCards = (): AppThunk => async (dispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC('loading'))
    const queryParams = getState().cards.queryCardParams
    try {
        const res = await CardsApi.getCards(queryParams)
        dispatch(setDateCard(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
export const fetchCreateCard = (date: DataCreateCardType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await CardsApi.createCard(date)
        dispatch(fetchCards())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
export const fetchUpdateCard = (date: UpdateData): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await CardsApi.updateCard(date)
        dispatch(fetchCards())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
export const fetchRemoveCard = (idCard: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await CardsApi.removeCard(idCard)
        dispatch(fetchCards())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
export const updateCardGradeTC = (data:UpdateCardGradeDataType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await CardsApi.updateCardGrade(data)
        dispatch(updateCardGrade(response.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
//type
export type CardReducerActionType =
    | ReturnType<typeof setQueryParams>
    | ReturnType<typeof setDateCard>
    | ReturnType<typeof updateCardGrade>

export type InitStateType = {
    queryCardParams: QueryParamsCardType
    dateCard: ResponseGateCardType
}