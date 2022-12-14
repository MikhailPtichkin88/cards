import {instance} from '../../../app/app-api';
import {GetSortPacksType} from '../packs-api';

export const CardsApi = {
    getCards(params: QueryParamsCardType) {
        return instance.get<ResponseGateCardType>(`cards/card`, {params})
    },
    createCard(dataCard: DataCreateCardType) {
        return instance.post<ResponseUpdateCardType>('cards/card', {card: dataCard})
    },
    removeCard(idCard: string) {
        return instance.delete<ResponseUpdateCardType>(`cards/card?id=${idCard}`)
    },
    updateCard(data: UpdateData) {
        return instance.put<ResponseGateCardType>('cards/card', {card: data})
    },
    updateCardGrade(data: UpdateCardGradeDataType) {
        return instance.put<UpdateCardGradeResponseType>('cards/grade', data)
    }
}

//type
export type UpdateCardGradeDataType = {
    grade: number
    card_id: string
}
export type UpdateCardGradeResponseType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: 3
    shots: 1
}
export type DataCreateCardType = CommonDataType & {
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}
export type CreateCardType = {
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    answer?: string
    question?: string
}
type CommonDataType = {
    answer?: string
    question?: string
    cardsPack_id: string
    grade?: number
    shots?: number
}
export type CardType = CommonDataType & DataCreateCardType & {
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
    cardsPack_id?: string | null
    min?: number | null
    max?: number | null
    sortCards?: null | GetSortPacksType
    page?: number | null
    pageCount?: number | null
}
export type ResponseGateCardType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
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
    answer?: string
}


