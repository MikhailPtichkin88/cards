import {instance} from "../../app/app-api";


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
    },
    changeName(data: ChangeNameDataType) {
        return instance.put<ChangeNameResponseType>('auth/me', data)
            .then(res => res.data)
    }
}


//types
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

export type ChangeNameDataType = {
    name: string
    avatar: string
}
export type ChangeNameResponseType = {
    updatedUser: AuthResponseType
    error?: string
}

