import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {
    ActionPasswordRecoveryType,
    passwordRecoveryReducer
} from '../features/auth/password-recovery/password-recovery-reducer';
import {AppActionsType, appReducer} from './app-reducer';
import {SignUpActionsType, signUpReducer} from '../features/auth/signUp/signUp-reducer';
import {AuthActionsType, authReducer} from '../features/auth/auth-reducer';
import {PacksActionType, packsReducer} from '../features/packsList/packs-reducer';
import {cardsReducer, CardReducerActionType} from '../features/packsList/Cards/cards-reducer';

const rootReducer = combineReducers({
    signUp: signUpReducer,
    app: appReducer,
    auth: authReducer,
    passwordRecovery: passwordRecoveryReducer,
    packs: packsReducer,
    cards: cardsReducer
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
    | CardReducerActionType
    | PacksActionType

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>


//@ts-ignore
window.store = store