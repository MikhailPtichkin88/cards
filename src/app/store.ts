import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {profileReducer} from "../features/profile/profile-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AuthActionsType, authReducer} from "../features/auth/auth-reducer";
import {AppActionsType, appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    // profile:profileReducer
    app:appReducer,
    auth:authReducer,
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export  type AppActionType = AuthActionsType | AppActionsType

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionType>
export const useAppDispatch: () => AppDispatch = useDispatch

//@ts-ignore
window.store = store