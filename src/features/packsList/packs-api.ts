import {instance} from "../../app/app-api";

export const packsAPI = {
    getPacks(params: PacksGetParamsType) {
        return instance.get<PacksType>('cards/pack', {params})
            .then(res => res.data)
    },
}
//types
export type PacksType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: false,
    name: string
    path: string
    grade: number,
    shots: number,
    deckCover: string
    cardsCount: number,
    type: string
    rating: number,
    created: Date | string
    updated: Date | string
    more_id: string,
    __v: number
}
export type PacksGetParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: GetSortPacksType
    page?: number
    pageCount?: number
    user_id?: string
}
export type GetSortPacksType =
    "0updated"
    | "1updated"
    | "0name"
    | "1name"
    | "0cardsCount"
    | "1cardsCount"
    | "0user_name"
    | "1user_name"
    | ""
