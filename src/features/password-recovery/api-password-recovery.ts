import axios from 'axios';

const instance= axios.create({
    baseURL:'https://neko-back.herokuapp.com/2.0/'
})

export  const apiPasswordRecovery=(data:DataPasswordRecoveryType)=>instance.post<ResponsePasswordRecovery>('auth/forgot',data)

//type
export type DataPasswordRecoveryType={
    email: string
    from?: string
    message: string
}
export type ResponsePasswordRecovery={
    info: string
    success: boolean
    answer: boolean
    html: boolean
}