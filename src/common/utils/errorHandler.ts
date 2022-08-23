import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer'
import {AppDispatch} from "../../app/store";

// generic function
export const handleServerAppError = (error:string, dispatch: AppDispatch) => {
    if (error) {
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { error: string }, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(error.error))
    dispatch(setAppStatusAC('failed'))
}
