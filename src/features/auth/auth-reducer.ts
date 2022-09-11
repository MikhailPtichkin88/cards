import {authAPI, AuthResponseType, ChangeNameDataType, LoginPostDataType} from "./auth-api";
import {AppThunk} from "../../app/store";
import {AxiosError} from "axios";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from '../../common/utils/error-utils';

const initAuthState = {
    initializeApp: false,
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
export type AuthActionsType = SetAuthACType | LogOutACType | changeNameandAvatarACType | SetInitializeAppType

export const authReducer = (state: initAuthStateType = initAuthState, action: AuthActionsType): initAuthStateType => {
    switch (action.type) {
        case "auth/SET-AUTH":
            return {...state, isAuth: true, authData: {...action.data}}
        case "auth/LOGOUT":
            return {...state, isAuth: false}
        case "auth/CHANGE-NAME-AVATAR":
            return {...state, authData: {...state.authData, name: action.name, avatar: action.avatar}}
        case 'auth/SET-INITIALIZE-APP':
            return {...state, initializeApp: action.value}
        default:
            return state
    }
}

type SetAuthACType = ReturnType<typeof setAuthAC>
export const setAuthAC = (data: AuthResponseType) => {
    return {type: "auth/SET-AUTH", data} as const
}
type LogOutACType = ReturnType<typeof logOutAC>
export const logOutAC = () => {
    return {type: "auth/LOGOUT"} as const
}
type changeNameandAvatarACType = ReturnType<typeof changeNameAndAvatarAC>
export const changeNameAndAvatarAC = (name: string, avatar: string) => {
    return {type: "auth/CHANGE-NAME-AVATAR", name, avatar} as const
}
type SetInitializeAppType = ReturnType<typeof setInitializeApp>
export const setInitializeApp = (value: boolean) => {
    return {type: "auth/SET-INITIALIZE-APP", value} as const
}

export const LoginTC = (data: LoginPostDataType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.login(data)
        dispatch(setAuthAC(res))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}

export const initializeAppTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.me()
        dispatch(setAuthAC(res));
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        const error = e as AxiosError<{ error: string }>
        if (error.response?.status !== 401) {
            handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
        }
    } finally {
        dispatch(setInitializeApp(true))
        dispatch(setAppStatusAC("succeeded"))
    }
}

export const logoutTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        await authAPI.logout()
        dispatch(logOutAC())
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}

export const changeNameAndAvatarTC = (name: string, avatar: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC("loading"))

    let data: ChangeNameDataType = {
        name,
        avatar,
    }
    try {
        const res = await authAPI.changeName(data)
        dispatch(changeNameAndAvatarAC(res.updatedUser.name, res.updatedUser.avatar!))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}