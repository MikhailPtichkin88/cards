import axios, {AxiosError} from 'axios'
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';
import {AppDispatch} from '../../app/store';


export const handleServerNetworkError = (e: Error | AxiosError<{ error: string }>, dispatch: AppDispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppErrorAC(error))
        dispatch(setAppStatusAC("failed"))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
}
