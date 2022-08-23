import {Dispatch} from 'redux'
import axios, {AxiosError} from 'axios'


export const handleServerNetworkError = (e: Error | AxiosError<{ error: string }>, dispatch: Dispatch<any>) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        // dispatch(setAppErrorAC(error))
        console.log(error)
    } else {
        // dispatch(setAppErrorAC(`Native error ${err.message}`))
        console.log(err.message)
    }
}
