import {NewPackType, packsAPI, PacksGetParamsType, PacksType, UpdatePackType} from './packs-api';
import {AppThunk} from '../../app/store';
import {handleServerNetworkError} from '../../common/utils/error-utils';
import {AxiosError} from 'axios';
import {setAppStatusAC} from '../../app/app-reducer';
import {routePath} from "../../common/constants/routePath";
import {useNavigate} from "react-router-dom";
/*---Reducer---*/
export const initState: PacksReducerInitStateType = {
    packs: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 5,
    },
    queryParams: {
        packName: undefined,
        min: undefined,
        max: undefined,
        sortPacks: undefined,
        page: 1,
        pageCount: 10,
        user_id: undefined,
    },
    filters: {
        ownerSwitcher: 'all'
    }
}

export const packsReducer = (state = initState, action: PacksActionType): PacksReducerInitStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {...state, packs: action.packs}
        case 'PACKS/UPDATE-QUERY-PARAMS':
            return {...state, queryParams: {...state.queryParams, ...action.params}}
        case 'PACKS/FILTER-OWNER-SWITCHER':
            return {...state, filters: {...state.filters, ownerSwitcher: action.filter}}
        default:
            return state
    }
}

//actions
export const setPacksAC = (packs: PacksType) =>
    ({type: 'PACKS/SET-PACKS', packs} as const)

export const updateQueryParamsAC = (params: PacksGetParamsType) =>
    ({type: 'PACKS/UPDATE-QUERY-PARAMS', params} as const)

export const filterPacksWithOwnerSwitcherAC = (filter: OwnerSwitcherType) =>
    ({type: 'PACKS/FILTER-OWNER-SWITCHER', filter} as const)

//types
export type OwnerSwitcherType = 'all' | 'my'
export type PacksFiltersType = {
    ownerSwitcher: OwnerSwitcherType
}

export type PacksActionType =
    ReturnType<typeof setPacksAC>
    | ReturnType<typeof updateQueryParamsAC>
    | ReturnType<typeof filterPacksWithOwnerSwitcherAC>

export type PacksReducerInitStateType = {
    packs: PacksType
    queryParams: PacksGetParamsType
    filters: PacksFiltersType
}
/*---Thunk---*/
export const getPacksTC = (queryParams: PacksGetParamsType): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(updateQueryParamsAC(queryParams))

        const params = getState().packs.queryParams
        const response = await packsAPI.getPacks(params)

        dispatch(setPacksAC(response))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}

export const addNewPackTC = (newPack: NewPackType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        await packsAPI.addNewPack(newPack)
        dispatch(getPacksTC({}))

    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const addNewPackFromProfileTC = (name: string, deckCover: string): AppThunk => async dispatch => {
    try{
        dispatch(setAppStatusAC("loading"))
        await packsAPI.addNewPack(({name, deckCover}))
        dispatch(filterPacksWithOwnerSwitcherAC('my'))
    }catch(err){
        handleServerNetworkError(err as Error | AxiosError<{ error: string }>, dispatch)
    }
    finally {
        dispatch(setAppStatusAC("idle"))
    }
}


export const changePackNameTC = (updatedPack: UpdatePackType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        await packsAPI.changePackName(updatedPack)
        dispatch(getPacksTC({}))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const deletePackTC = (id: string): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatusAC('loading'))
        await packsAPI.deletePack(id)
        dispatch(getPacksTC({}))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
