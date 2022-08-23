import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {profileReducer} from "../redux/profileReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {SignUpActionsType, signUpReducer} from "../pages/SignUp/signUp-reducer";

const rootReducer = combineReducers({
    // profile:profileReducer
    app: appReducer,
    signUp: signUpReducer,
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
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>