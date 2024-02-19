import { TFile } from '@entities/File'
import { TAgreement } from './types'

export type TFixMethod = {
    comment: string
    userId: number
    files: TFile[]
    id: number
    isDispatcherService: boolean
    method: FixMethodTypeIds
    malfunctionId: number
    sum: number
    state: FixMethodStageIds
    agreement: TAgreement[]
}

export enum FixMethodTypeIds {
    'HIMSELF' = 10,
    'CONTRACT' = 20,
    'ON_YOUR_OWN_AND_AGREEMENT' = 30,
    'SUBDIVISION' = 40,
    'TRANSFER_TO_HEAD_OF_THE_DEPARTMENT' = 50,
    'TRANSFER_TO_ENGINEER' = 60,
    'TERMINATION_OF_EXPLOITATION' = 70,
    'BUY_NEW' = 80,
}

export enum FixMethodStageIds {
    'ОМУ - ОПО' = 10,
    'ОМУ - нач подразделение' = 20,
    'Согласование с ответственными лицами' = 30,
    'Согласование с начальником подразделения' = 40,
    'ОМУ главный инженер' = 50,
}
