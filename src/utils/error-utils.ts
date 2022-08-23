import {setAppErrorAC,  setAppStatusAC,  AppActionsType} from '../app/app-reducer'
import { Dispatch } from 'redux'
import {AuthResponseType, LogoutType} from "../features/auth/auth-api";

// generic function
export const handleServerAppError = (error:string, dispatch: ErrorUtilsDispatchType) => {
    if (error) {
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { error: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.error))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>