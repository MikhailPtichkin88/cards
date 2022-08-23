import axios, {AxiosError} from "axios";
import {AppDispatch} from "../../app/store";
// it must handle app.error
export const errorUtils = (e: Error | AxiosError<{error: string}>, dispatch: AppDispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
    } else {

    }
}