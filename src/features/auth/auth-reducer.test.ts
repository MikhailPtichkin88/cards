import {authReducer, changeNameAC, initAuthStateType, logOutAC, setAuthAC} from "./auth-reducer";
import {AuthResponseType} from "./auth-api";


let startState:initAuthStateType

beforeEach(()=>{
    startState= {
        isAuth: false,
        authData: {
            _id: "",
            name: "",
            avatar: "",
            publicCardPacksCount: 0,
            created: "",
            updated: "",
            isAdmin: false,
            verified: false,
            rememberMe: false,
            error: ""
        }as AuthResponseType
    }
})

test('setAuthAC should work correctly', ()=>{

    let data={
        _id: "1",
        name: "Admin",
        avatar: "https://example.com",
        publicCardPacksCount: 10,
        created: "",
        updated: "",
        isAdmin: true,
        verified: true,
        rememberMe: true,
        error: ""
    }as AuthResponseType

    const result = authReducer(startState, setAuthAC(data))

    expect(result.isAuth).toBeTruthy()
    expect(result.authData.name).toEqual("Admin")
    expect(result.authData.publicCardPacksCount).toEqual(10)
    expect(result.authData.isAdmin).toBeTruthy()
    expect(result.authData.avatar).toEqual("https://example.com")
    expect(result.isAuth).not.toEqual(startState.isAuth)
})

test('logOutAC should work correctly', ()=>{
    startState= {
        isAuth: true,
        authData: {}as AuthResponseType
    }

    const result = authReducer(startState, logOutAC())

    expect(result.isAuth).toBeFalsy()
    expect(result.isAuth).not.toEqual(startState.isAuth)
})

test('changeNameAC should work correctly', ()=>{

    const result = authReducer(startState, changeNameAC("new name"))

    expect(startState.authData.name).toBeFalsy()
    expect(result.authData.name).toEqual("new name")
    expect(result.authData.name).not.toEqual(startState.authData.name)
})