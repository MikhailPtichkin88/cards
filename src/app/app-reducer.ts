export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/SET-STATUS':
            return {...state, status: action.status}
        case 'app/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export type AppActionsType = SetAppStatusACType | SetAppErrorACType

type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status:RequestStatusType)=>{
    return {type:"app/SET-STATUS",status}as const
}
type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error:string | null)=>{
    return {type:"app/SET-ERROR",error}as const
}