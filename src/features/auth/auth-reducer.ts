import {authAPI, AuthResponseType, ChangeNameDataType, LoginPostDataType} from "./auth-api";
import {AppThunk} from "../../app/store";
import {AxiosError} from "axios";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from '../../common/utils/error-utils';



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

export const LoginTC = (data: LoginPostDataType): AppThunk => async dispatch=> {
        dispatch(setAppStatusAC("loading"))
    try {
            const res = await  authAPI.login(data)
        dispatch(setAuthAC(res))
        dispatch(setAppStatusAC("succeeded"))
    }catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>,dispatch)
    }
}

export const initializeAppTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await  authAPI.me()
        dispatch(setAuthAC(res));
        dispatch(setAppStatusAC("succeeded"))
    }catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>,dispatch)
    }
}

export const logoutTC = (): AppThunk => async dispatch => {
        dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.logout()
        dispatch(logOutAC())
        dispatch(setAppStatusAC("succeeded"))
    }catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>,dispatch)
    }
}

export const changeNameTC = (name:string): AppThunk => async dispatch => {
        dispatch(setAppStatusAC("loading"))

        let data:ChangeNameDataType = {
            name,
            avatar:""
        }

    try {
        const res = await authAPI.changeName(data)
        dispatch(changeNameAC(res.updatedUser.name))
        dispatch(setAppStatusAC("succeeded"))
    }catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>,dispatch)
    }
}