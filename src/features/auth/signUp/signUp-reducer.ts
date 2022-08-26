import {signUpApi, SignUpDataType} from './signUp-api';
import {AxiosError} from 'axios';
import {AppThunk} from '../../../app/store';
import {setAppStatusAC} from '../../../app/app-reducer';
import {handleServerNetworkError} from '../../../common/utils/error-utils';

//---Reducer---
const initState = {
    isSignUp: false
}
export const signUpReducer = (state = initState, action: SignUpActionsType): SignUpStateType => {
    switch (action.type) {
        case "SIGN-UP/SET-IS-SIGNUP":
            return {...state, isSignUp: action.isSignUp}
        default:
            return state
    }
}

//actions
export const setIsSignUpAC = (isSignUp: boolean) => ({type: "SIGN-UP/SET-IS-SIGNUP", isSignUp: isSignUp} as const)
//types
export type SignUpStateType = typeof initState
export type SignUpActionsType =
    ReturnType<typeof setIsSignUpAC>

//---Thunks---
export const signUpTC = (data: SignUpDataType): AppThunk => async dispatch => {

    dispatch(setAppStatusAC("loading"))
    try {
        await signUpApi.signUp(data)
        dispatch(setIsSignUpAC(true))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>,dispatch)
    }
}
