import {instance} from "../../app/app-api";

export type LoginPostDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type AuthResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string | undefined
    publicCardPacksCount: number
    created: Date | string
    updated: Date | string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean

    error?: string | undefined
}

export type LogoutType = {
    info: string
    error?: string
}


export const authAPI = {
    login(data: LoginPostDataType) {
        return instance.post<AuthResponseType>('auth/login', data)
            .then(res => res.data)

    },
    me() {
        return instance.post<AuthResponseType>('auth/me', {})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutType>('auth/me', {})
            .then(res => res.data)
    }
}