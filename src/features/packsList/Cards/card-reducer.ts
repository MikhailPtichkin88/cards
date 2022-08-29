import {CardApi, DataCreateCardType, QueryParamsCardType, ResponseGateCardType, UpdateData} from './card-api';
import {AppThunk, RootState} from '../../../app/store';
import {setAppStatusAC} from '../../../app/app-reducer';
import {handleServerNetworkError} from '../../../common/utils/error-utils';
import {AxiosError} from 'axios';

const initState: InitStateType = {
    queryCardParams: {
        cardAnswer: null,
        cardQuestion: null,
        cardsPack_id: null,
        min: null,
        max: null,
        sortCards: null,
        page: null,
        pageCount: null,
    },
    dateCard: {} as ResponseGateCardType
}

export const cardReducer = (state = initState, action: CardReducerActionType): InitStateType => {
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
        const res = await CardApi.getCards(queryParams)
        dispatch(setDateCard(res.data))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
export const fetchCreateCard = (date: DataCreateCardType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await CardApi.createCard(date)
        dispatch(fetchCards())
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
export const fetchUpdateCard = (date: UpdateData): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await CardApi.updateCard(date)
        dispatch(fetchCards())
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
export const fetchRemoveCard = (idCard: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await CardApi.removeCard(idCard)
        dispatch(fetchCards())
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