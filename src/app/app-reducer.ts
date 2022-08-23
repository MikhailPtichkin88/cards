//---Reducer---
const initState = {
    status: "idle" as AppStatusType,
    error: null as string | null,
}
export const appReducer = (state = initState, action: AppActionsType): InitStateType => {
    switch (action.type) {
        case 'APP/SET-APP-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const setAppStatusAC = (status: AppStatusType) => ({type: 'APP/SET-APP-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
//types
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitStateType = {
    status: AppStatusType,
    error: string | null
}
export type AppActionsType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>

//---Thunks---
