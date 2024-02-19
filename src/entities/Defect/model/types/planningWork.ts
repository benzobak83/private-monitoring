import { TIdWithName } from '@shared/types/Global'
import { TWorkAgreement, DefectWorkStageIds } from './types'

export type TPlanningWork = {
    id: number
    dateStart: string
    dateEnd: string
    sum: string
    worker: TIdWithName
    responsible: TIdWithName
    malfunctionId: number
    agreement: TWorkAgreement
    state: DefectWorkStageIds
    timeToMakeDecision: string
}
