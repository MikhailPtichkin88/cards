import {PasswordRecoveryReducer, PasswordRecoveryType, setEmail} from './password-recovery-reducer';


let state = {} as PasswordRecoveryType

beforeEach(() => {
    state = {
        email: null,
    }
})

test('Adding an email to which the link was sent', () => {
    const newState = PasswordRecoveryReducer(state, setEmail('anton@gmail.com'))

    expect(newState.email).toBe('anton@gmail.com')
    expect(Object.keys(newState).length).toBe(1)
})