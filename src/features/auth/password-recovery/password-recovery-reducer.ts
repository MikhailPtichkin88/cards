import {AppThunk} from '../../../app/store';
import {api, DataPasswordRecoveryType} from './api-password-recovery';
import {handleServerNetworkError} from '../../../common/utils/error-utils';
import {AxiosError} from 'axios';
import {setAppStatusAC} from '../../../app/app-reducer';

const initialState: PasswordRecoveryType = {
    email: null,
}

export const passwordRecoveryReducer = (state = initialState, action: ActionPasswordRecoveryType): PasswordRecoveryType => {
    switch (action.type) {
        case 'PS/SET-EMAIL':
            return {...state, email: action.email}
        default:
            return state
    }
}
//action
export const setEmail = (email: string) => ({type: 'PS/SET-EMAIL', email} as const)
//thunk
export const passwordRecoveryLink = (email: string): AppThunk => async dispatch => {
    const data: DataPasswordRecoveryType = {
        email,
        message: '<div style=\'background-color: lime; padding: 15px\'> password recovery link:<a href=\'http://localhost:3000/#/set-new-password/$token$\'>link</a></div>'
    }
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await api.fetchPasswordRecoveryLink(data)
        dispatch(setEmail(email))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
export const updatePassword = (password: string, resetPasswordToken: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = api.fetchUpdatePassword({password, resetPasswordToken})
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }

}
//type
export type PasswordRecoveryType = {
    email: string | null
}
export type ActionPasswordRecoveryType = ReturnType<typeof setEmail>
