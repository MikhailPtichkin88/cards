import {AppThunk} from '../../app/store';
import {apiPasswordRecovery, DataPasswordRecoveryType} from './api-password-recovery';

const initialState = {} as PasswordRecoveryType

export const PasswordRecoveryReducer = (state = initialState, action: ActionPasswordRecoveryType): PasswordRecoveryType => {
    switch (action.type) {
        case 'PS/SET-NEW-PASSWORD':
            return {...state, newPassword: action.newPassword}
        case 'PS/SET-STATUS-SENDING-PASSWORD':
            return {...state, statusSendingPassword: action.status}
        case 'PS/SET-EMAIL':
            return {...state, email: action.email}
        default:
            return state
    }
}
//action
export const setNewPassword = (newPassword: string) => ({type: 'PS/SET-NEW-PASSWORD', newPassword} as const)
export const setEmail = (email: string) => ({type: 'PS/SET-EMAIL', email} as const)
export const setStatusSendingPassword = (status: boolean) => ({type: 'PS/SET-STATUS-SENDING-PASSWORD', status} as const)
//thunk
export const updatePassword = (email: string): AppThunk => async dispatch => {
    const data: DataPasswordRecoveryType = {
        email,
        message: '<div style=\'background-color: lime; padding: 15px\'> password recovery link:<a href=\'http://localhost:3000/#/set-new-password/$token$\'>link</a></div>'
    }
    try {
        debugger
        const res = await apiPasswordRecovery(data)
        dispatch(setEmail(email))
        dispatch(setStatusSendingPassword(true))
    } catch (e) {
        console.log(e)
    }
}
//type
type PasswordRecoveryType = {
    newPassword: string
    email: string
    statusSendingPassword: boolean
    token: string
}
export type ActionPasswordRecoveryType =
    | ReturnType<typeof setNewPassword>
    | ReturnType<typeof setStatusSendingPassword>
    | ReturnType<typeof setEmail>

