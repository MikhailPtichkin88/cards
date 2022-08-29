import {packsAPI, PacksGetParamsType, PacksType} from "./packs-api";
import {AppThunk} from "../../app/store";
import {handleServerNetworkError} from "../../common/utils/error-utils";
import {AxiosError} from "axios";
/*---Reducer---*/
const initState:PacksType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 10,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
}

export const packsReducer = (state = initState, action: PacksActionType):PacksType => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            return {...state,...action.packs}
        default:
            return state
    }
}

//actions
export const setPacksAC = (packs: PacksType) => {
    return {
        type: "PACKS/SET-PACKS",
        packs
    }as const
}

//types
export type PacksActionType =
    ReturnType<typeof setPacksAC>

/*---Thunk---*/
export const getPacksTC = (params:PacksGetParamsType): AppThunk => async dispatch => {
   try{
       const response = await packsAPI.getPacks(params)
       dispatch(setPacksAC(response))
   }catch (e){
       handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
   }
}