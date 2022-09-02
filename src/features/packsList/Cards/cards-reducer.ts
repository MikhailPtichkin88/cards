import {
    CardsApi,
    CardType,
    DataCreateCardType,
    QueryParamsCardType,
    ResponseGateCardType,
    UpdateData
} from './cards-api';
import {AppThunk, RootState} from '../../../app/store';
import {setAppStatusAC} from '../../../app/app-reducer';
import {handleServerNetworkError} from '../../../common/utils/error-utils';
import {AxiosError} from 'axios';

const initState: InitStateType = {
    queryCardParams: {
        cardAnswer: null,
        cardQuestion: null,
        cardsPack_id: '630c6777798c4a2534c5d5b1',
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
        default :
            return state
    }
}
//action
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
        const res = await CardsApi.createCard(date)
        dispatch(fetchCards())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
export const fetchUpdateCard = (date: UpdateData): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await CardsApi.updateCard(date)
        dispatch(fetchCards())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
export const fetchRemoveCard = (idCard: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await CardsApi.removeCard(idCard)
        dispatch(fetchCards())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
//type
export type CardReducerActionType =
    | ReturnType<typeof setQueryParams>
    | ReturnType<typeof setDateCard>

export type InitStateType = {
    queryCardParams: QueryParamsCardType
    dateCard: ResponseGateCardType
}