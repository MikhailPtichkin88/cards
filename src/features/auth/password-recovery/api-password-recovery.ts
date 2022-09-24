import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const api = {
    fetchPasswordRecoveryLink: (data: DataPasswordRecoveryType) => {
        return instance.post<ResponsePasswordRecovery>('auth/forgot', data)
    },
    fetchUpdatePassword: (data: DataUpdatePassword) => {
        return instance.post<{ info: string }>('auth/set-new-password', data)
    }
}
//type
export type DataPasswordRecoveryType = {
    email: string
    from?: string
    message: string
}
export type ResponsePasswordRecovery = {
    info: string
    success: boolean
    answer: boolean
}
export type DataUpdatePassword = {
    password: string
    resetPasswordToken: string
}