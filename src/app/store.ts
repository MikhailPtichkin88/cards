import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {
    ActionPasswordRecoveryType,
    PasswordRecoveryReducer
} from '../features/auth/password-recovery/password-recovery-reducer';
import {AppActionsType, appReducer} from './app-reducer';
import {SignUpActionsType, signUpReducer} from '../features/auth/signUp/signUp-reducer';
import {AuthActionsType, authReducer} from '../features/auth/auth-reducer';

const rootReducer = combineReducers({
    signUp: signUpReducer,
    app: appReducer,
    auth: authReducer,
    passwordRecovery: PasswordRecoveryReducer,
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
    | ActionPasswordRecoveryType

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>