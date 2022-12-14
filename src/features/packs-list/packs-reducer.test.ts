import {PacksFiltersType, packsReducer, PacksReducerInitStateType, updateQueryParamsAC} from "./packs-reducer";
import {PacksGetParamsType} from "./packs-api";

let startState:PacksReducerInitStateType

beforeEach(()=>{
    startState= {
        packs: {
            cardPacks: [],
            cardPacksTotalCount: 0,
            maxCardsCount: 10,
            minCardsCount: 0,
            page: 0,
            pageCount: 10,
        },
        queryParams: {
            packName: undefined,
            min: 0,
            max: 110,
            sortPacks: undefined,
            page: 0,
            pageCount: 10,
            user_id: undefined,
        },
        filters:{}as PacksFiltersType
    }
})

test('updateQueryParamsAC should work correctly', ()=>{

    let data = {
        packName: "cards for people",
        min: 0,
        max: 110,
        sortPacks: undefined,
        page: 1,
        pageCount: 10,
        user_id: undefined,
    } as PacksGetParamsType

    const result = packsReducer(startState, updateQueryParamsAC(data))

    expect(result.queryParams.packName).toBe("cards for people")
    expect(startState.queryParams.packName).toBe(undefined)

    const oldPacks = startState.packs
    const newPacks = result.packs
    expect(oldPacks).toStrictEqual(newPacks)
})

