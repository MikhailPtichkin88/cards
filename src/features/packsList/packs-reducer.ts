import {packsAPI, PacksGetParamsType, PacksType} from "./packs-api";
import {AppThunk} from "../../app/store";
import {handleServerNetworkError} from "../../common/utils/error-utils";
import {AxiosError} from "axios";
/*---Reducer---*/
const initState: PacksReducerInitStateType = {
    packs: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 10,
        minCardsCount: 0,
        page: 1,
        pageCount: 5,
    },
    queryParams: {
        packName: undefined,
        min: 0,
        max: 110,
        sortPacks: undefined,
        page: 1,
        pageCount: 10,
        user_id: undefined,
    }
}

export const packsReducer = (state = initState, action: PacksActionType): PacksReducerInitStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            return {...state, packs: action.packs}
        case "PACKS/UPDATE-QUERY-PARAMS":
            return {...state, queryParams: {...state.queryParams, ...action.params}}
        default:
            return state
    }
}

//actions
export const setPacksAC = (packs: PacksType) => {
    return {
        type: "PACKS/SET-PACKS",
        packs
    } as const
}
export const updateQueryParamsAC = (params: PacksGetParamsType) => {
    return {
        type: "PACKS/UPDATE-QUERY-PARAMS",
        params
    } as const
}
//types
export type PacksActionType =
    ReturnType<typeof setPacksAC>
    | ReturnType<typeof updateQueryParamsAC>
export type PacksReducerInitStateType = {
    packs: PacksType
    queryParams: PacksGetParamsType
}
/*---Thunk---*/
export const getPacksTC = (queryParams: PacksGetParamsType): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(updateQueryParamsAC(queryParams))
        const params = getState().packs.queryParams
        const response = await packsAPI.getPacks(params)
        dispatch(setPacksAC(response))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}