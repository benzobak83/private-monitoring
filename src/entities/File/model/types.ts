import { TIdWithName } from '@shared/types/Global'

export type TFile = {
    id: number
    name: string
    link: string
    uploadedAt?: string
    changed?: boolean
    documentType?: TIdWithName
    uid?: string
}
