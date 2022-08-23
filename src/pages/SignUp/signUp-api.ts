import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})
//api
export const signUpApi = {
    signUp(signUpData: SignUpDataType) {
        return instance.post('auth/register', signUpData)
    }
}
//types
export type SignUpDataType = {
    email: string
    password: string
}
export type SignUpErrorType = {
    error: string
    email: string
    in: string
}
