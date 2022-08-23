import {signUpApi, SignUpDataType, SignUpErrorType} from "./signUp-api";
import axios, {AxiosError} from "axios";
import {AppThunk} from "../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";

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
        const response = await signUpApi.signUp(data)
        dispatch(setIsSignUpAC(true))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as SignUpErrorType).error : err.message
            dispatch(setAppErrorAC(error))
        } else {
            dispatch(setAppErrorAC(`Native error ${err.message}`))
        }
    } finally {
        setAppStatusAC("succeeded")
    }
}
