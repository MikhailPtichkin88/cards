import {instance} from '../../../app/app-api';

export const CardApi = {
    getCards(queryParams: QueryParamsCardType) {
        let queryString = '?'
        let key: keyof typeof queryParams
        for (key in queryParams) {
            if (queryParams[key]) {
                queryString += `${key}=${queryParams[key]}&`
            }
        }
        return instance.get<ResponseGateCardType>(`cards/card${queryString}`)
    },
    createCard(dataCard: DataCreateCardType) {
        return instance.post<ResponseUpdateCardType>('cards/card', {card: dataCard})
    },
    removeCard(idCard: string) {
        return instance.delete<ResponseUpdateCardType>(`cards/card?id=${idCard}`)
    },
    updateCard(data: UpdateData) {
        return instance.put<ResponseGateCardType>('cards/card', {card: data})
    }
}

//type
export type DataCreateCardType = CommonDataType & {
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}
type CommonDataType = {
    answer?: string
    question?: string
    cardsPack_id: string
    grade?: number
    shots?: number
}
export type CardType = CommonDataType & {
    created: string
    updated: string
    _id: string
    user_id: string
    comments: string
    type: string
    rating: number
    __v: number
    more_id: string
}
export type QueryParamsCardType = {
    cardAnswer?: string | null
    cardQuestion?: string | null
    cardsPack_id: string | null
    min?: number | null
    max?: number | null
    sortCards?: string | null
    page?: number | null
    pageCount?: number | null
}
export type ResponseGateCardType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount?: number
    packUserId?: string
    packName?: string
    packDeckCover?: string
    packCreated?: string
    packUpdated?: string
    token?: string
    tokenDeathTime?: number
    packPrivate?: boolean
}
export type ResponseUpdateCardType = CardType & {
    token: string
    tokenDeathTime: number
}
export type UpdateData = {
    _id: string
    question?: string
    comments?: string
}


