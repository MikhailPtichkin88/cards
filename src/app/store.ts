import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {
    ActionPasswordRecoveryType,
    passwordRecoveryReducer
} from '../features/auth/password-recovery/password-recovery-reducer';
import {AppActionsType, appReducer} from './app-reducer';
import {SignUpActionsType, signUpReducer} from '../features/auth/sign-up/signUp-reducer';
import {AuthActionsType, authReducer} from '../features/auth/auth-reducer';
import {initState, PacksActionType, packsReducer} from '../features/packs-list/packs-reducer';
import {cardsReducer, CardReducerActionType} from '../features/packs-list/cards/cards-reducer';
import {loadStateMaxCards, loadStateMinCards, loadStateOwnerSwitcher, saveState} from '../common/utils/local-utils';


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
const preloadedState = {
    packs: {
        ...initState,
        queryParams: {
            ...initState.queryParams,
            min: loadStateMinCards(),
            max: loadStateMaxCards(),
        },
        filters: {
            ownerSwitcher: loadStateOwnerSwitcher()
        }
    }

}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = legacy_createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(() => {
    saveState({
        queryParams: {
            min: store.getState().packs.queryParams.min,
            max: store.getState().packs.queryParams.max,
        },
        filters: {
            ownerSwitcher: store.getState().packs.filters.ownerSwitcher,
        }
    });
});
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