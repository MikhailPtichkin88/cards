import {signUpApi, SignUpDataType, SignUpErrorType} from "./signUp-api";
import axios, {AxiosError} from "axios";
import {AppThunk} from "../../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../../app/app-reducer";
import {handleServerNetworkError} from "../../../common/utils/error-utils";

//---Reducer---
const initState = {
    isSignUp: false
}
export const signUpReducer = (state = initState, action: SignUpActionsType): InitStateType => {
    switch (action.type) {
        case "SIGN-UP/SET-IS-REGISTER":
            return {...state, isSignUp: action.isSignUp}
        default:
            return state
    }
}

//actions
export const setIsSignUpAC = (isSignUp: boolean) => ({type: 'SIGN-UP/SET-IS-REGISTER', isSignUp: isSignUp} as const)
//types
type InitStateType = typeof initState
export type SignUpActionsType =
    ReturnType<typeof setIsSignUpAC>


//---Thunks---
export const signUpTC = (data: SignUpDataType): AppThunk => async (dispatch) => {

    dispatch(setAppStatusAC("loading"))
    try {
        await signUpApi.signUp(data)
        dispatch(setIsSignUpAC(true))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(err,dispatch)
    } finally {
        setAppStatusAC("succeeded")
    }
}
