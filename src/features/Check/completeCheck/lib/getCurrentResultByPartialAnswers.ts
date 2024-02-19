import { ResultCheckIds } from '@entities/Check'
import { ChecklistTypeAnswer } from '@entities/Settings/ChecklistInspection'

export const getCurrentResultByTypeAnswers = (
    typeAnswers: ChecklistTypeAnswer[]
) => {
    if (!typeAnswers) return null

    if (typeAnswers.includes(ChecklistTypeAnswer.NEGATIVE)) {
        return ResultCheckIds.NEGATIVE
    }
    if (typeAnswers.includes(ChecklistTypeAnswer.WARNING)) {
        return ResultCheckIds.WARNING
    }
    if (typeAnswers.includes(ChecklistTypeAnswer.OK)) {
        return ResultCheckIds.OK
    }
    return null
}
