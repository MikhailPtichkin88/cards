import {authAPI, AuthResponseType, LoginPostDataType} from "../auth/auth-api";
import {AppThunk} from "../../app/store";
import {AxiosError} from "axios";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initAuthState = {
    isAuth: false,
    authData: {
        _id: "",
        name: "",
        avatar: "",
        publicCardPacksCount: 0,
        created: "",
        updated: "",
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: ""
    } as AuthResponseType
}

export type initAuthStateType = typeof initAuthState
export type AuthActionsType = SetAuthACType | IsAuthACType | LogOutACType

export const authReducer = (state: initAuthStateType = initAuthState, action: AuthActionsType): initAuthStateType => {
    switch (action.type) {
        case "auth/SET-AUTH":
            return {...state, isAuth: true, authData: {...action.data}}
        case "auth/LOGOUT":
            return {...state, isAuth: false}
        default:
            return state
    }
}


type SetAuthACType = ReturnType<typeof setAuthAC>
export const setAuthAC = (data: AuthResponseType) => {
    return {type: "auth/SET-AUTH", data} as const
}
type IsAuthACType = ReturnType<typeof isAuthAC>
export const isAuthAC = (isAuth: boolean) => {
    return {type: "auth/SET-IS-AUTH", isAuth} as const
}
type LogOutACType = ReturnType<typeof logOutAC>
export const logOutAC = () => {
    return {type: "auth/LOGOUT"} as const
}

export const LoginTC = (data: LoginPostDataType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.login(data)
            .then(res => {
                if(!res.error){
                    dispatch(setAuthAC(res))
                    dispatch(setAppStatusAC("succeeded"))
                }else{
                    handleServerAppError(res.error, dispatch)
                }
            })
            .catch((err: AxiosError<{ error: string }>) => {
                handleServerNetworkError(err.response!.data,dispatch)
            })
    }
}

export const initializeAppTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.me()
        .then(res => {

            if (!res.error) {
                dispatch(setAuthAC(res));
                dispatch(setAppStatusAC("succeeded"))
            }else{
                handleServerAppError(res.error,dispatch)
            }
        })
        .catch((err: AxiosError<{ error: string }>) => {
            handleServerNetworkError(err.response!.data,dispatch)
        })
}

export const logoutTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.logout()
            .then(res => {
                if (res.info) {
                    dispatch(logOutAC())
                    dispatch(setAppStatusAC("succeeded"))
                }else if(res.error){
                    handleServerAppError(res.error, dispatch)
                }
            })
            .catch((err: AxiosError<{ error: string }>) => {
                handleServerNetworkError(err.response!.data,dispatch)
            })
    }
}