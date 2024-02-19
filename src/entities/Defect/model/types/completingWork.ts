import { TIdWithName } from '@shared/types/Global'
import { DefectWorkStageIds, TWorkAgreement } from './types'

export type TCompletingWork = {
    id: number
    dateStart: string
    dateEnd: string
    sum: string
    worker: TIdWithName
    responsible: TIdWithName
    malfunctionId: number
    comment: string
    agreement: TWorkAgreement
    planningId: number
    state: DefectWorkStageIds
}
