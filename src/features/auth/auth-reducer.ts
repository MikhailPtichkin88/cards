import {authAPI, AuthResponseType, ChangeNameDataType, LoginPostDataType} from "./auth-api";
import {AppThunk} from "../../app/store";
import {AxiosError} from "axios";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/errorHandler";


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
export type AuthActionsType = SetAuthACType | IsAuthACType | LogOutACType | changeNameACType

export const authReducer = (state: initAuthStateType = initAuthState, action: AuthActionsType): initAuthStateType => {
    switch (action.type) {
        case "auth/SET-AUTH":
            return {...state, isAuth: true, authData: {...action.data}}
        case "auth/LOGOUT":
            return {...state, isAuth: false}
        case "auth/CHANGE-NAME":
            return {...state, authData: {...state.authData, name:action.name}}
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
type changeNameACType = ReturnType<typeof changeNameAC>
export const changeNameAC = (name:string) => {
    return {type: "auth/CHANGE-NAME",name} as const
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

export const changeNameTC = (name:string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))

        let data:ChangeNameDataType = {
            name,
            avatar:""
        }

        authAPI.changeName(data)
            .then(res => {
                if (!res.error) {
                    dispatch(changeNameAC(res.updatedUser.name))
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