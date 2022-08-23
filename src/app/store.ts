import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {profileReducer} from "../redux/profileReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {SignUpActionsType, signUpReducer} from "../pages/SignUp/signUp-reducer";
import {useDispatch} from "react-redux";
import {AuthActionsType, authReducer} from "../features/auth/auth-reducer";
import {AppActionsType, appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    // profile:profileReducer
    signUp: signUpReducer,
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
//types
export type ActionsType =
    AppActionsType
    | SignUpActionsType
    | AuthActionsType

export  type AppActionType = AuthActionsType | AppActionsType

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>