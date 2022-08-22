import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {
    ActionPasswordRecoveryType,
    PasswordRecoveryReducer
} from '../features/password-recovery/password-recovery-reducer';

const rootReducer = combineReducers({
    passwordRecovery: PasswordRecoveryReducer,
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppActionType = ActionPasswordRecoveryType

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionType>
