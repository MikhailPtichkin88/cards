import {AppThunk} from '../../../app/store';
import {api, DataPasswordRecoveryType} from './api-password-recovery';
import {handleServerNetworkError} from '../../../common/utils/error-utils';
import {AxiosError} from 'axios';

const initialState: PasswordRecoveryType = {
    email: null,
    statusSendingPassword: 'idle',
    token: null,
}

export const PasswordRecoveryReducer = (state = initialState, action: ActionPasswordRecoveryType): PasswordRecoveryType => {
    switch (action.type) {
        case 'PS/SET-STATUS-SENDING-PASSWORD':
            return {...state, statusSendingPassword: action.status}
        case 'PS/SET-EMAIL':
            return {...state, email: action.email}
        default:
            return state
    }
}
//action
export const setEmail = (email: string) => ({type: 'PS/SET-EMAIL', email} as const)
export const setStatusSendingPassword = (status: StatusLoading) => ({
    type: 'PS/SET-STATUS-SENDING-PASSWORD',
    status
} as const)
//thunk
export const passwordRecoveryLink = (email: string): AppThunk => async dispatch => {
    const data: DataPasswordRecoveryType = {
        email,
        message: '<div style=\'background-color: lime; padding: 15px\'> password recovery link:<a href=\'http://localhost:3000/#/set-new-password/$token$\'>link</a></div>'
    }
    try {
        const res = await api.fetchPasswordRecoveryLink(data)
        dispatch(setEmail(email))
        dispatch(setStatusSendingPassword('loading'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }
}
export const updatePassword = (password: string, resetPasswordToken: string): AppThunk => async dispatch => {
    try {
        const res = api.fetchUpdatePassword({password, resetPasswordToken})
        dispatch(setStatusSendingPassword('succeeded'))
    } catch (e) {
        handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch)
    }

}
//type
type PasswordRecoveryType = {
    email: string | null
    statusSendingPassword: StatusLoading
    token: string | null
}
export type ActionPasswordRecoveryType =
    | ReturnType<typeof setStatusSendingPassword>
    | ReturnType<typeof setEmail>

export type StatusLoading = 'idle' | 'loading' | 'succeeded' | 'failed'