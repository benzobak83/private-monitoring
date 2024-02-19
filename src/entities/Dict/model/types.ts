import { ResultCheckIds, StateCheckIds } from '@entities/Check'
import {
    AgreementAnswerIds,
    DefectStageIds,
    FixMethodStageIds,
    FixMethodTypeIds,
} from '@entities/Defect'
import {
    ChecklistType,
    ChecklistTypeControl,
} from '@entities/Settings/Checklist'
import { ChecklistTypeAnswer } from '@entities/Settings/ChecklistInspection'

export type TDict = {
    check: TDictCheck
    checklist: TDictChecklist
    manager: TDictManager
    malfunction: TDictDefect
}

// checklist

export type TDictChecklist = {
    typeAnswerChecklist: ChecklistTypeAnswer
    typeCheckList: ChecklistType
    typeControl: ChecklistTypeControl
    typeFrequency: TypeFrequency
}

export enum TypeFrequency {
    'DAY' = 10,
    'WEEK' = 20,
    'MOUNTH' = 30,
    'QUARTER' = 40,
    'HALF_YEAR' = 50,
    'YEAR' = 60,
}

//manager

type TDictManager = {
    typeManager: { key: TypeManager; name: string }[]
}

export enum TypeManager {
    'MECHANIC' = 10,
    'POWER_ENGINEER' = 20,
    'BOSS' = 30,
    'ENGINEER' = 40,
    'RESPONSIBLE' = 50,
    'EMPLOYEE_OOP' = 60,
}

export enum DefectPriority {
    'HIGH' = 10,
    'LOW' = 20,
    'AVERAGE' = 30,
}

//check
type TDictCheck = {
    state: Array<{ id: StateCheckIds; name: string }>
    typeResult: Array<{ id: ResultCheckIds; name: string }>
}

//defect

type TDictDefect = {
    diagnosticAgreementAnswer: { id: AgreementAnswerIds; name: string }[]
    diagnosticStage: { id: FixMethodStageIds; name: string }[]
    method: { id: FixMethodTypeIds; name: string }[]
    stage: { id: DefectStageIds; name: string }[]
    malfunctionPriority: { id: DefectPriority; name: string }[]
}
