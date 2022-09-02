import {instance} from "../../../app/app-api";

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
