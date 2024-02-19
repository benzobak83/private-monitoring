import {
    successColor,
    warningColor,
    errorColor,
} from '@shared/styles/variables/_export.module.scss'
import { ChecklistTypeAnswer } from '../model/types'

export const getColorByTypeAnswer = (answerType: ChecklistTypeAnswer) => {
    switch (answerType) {
        case ChecklistTypeAnswer.OK:
            return successColor

        case ChecklistTypeAnswer.WARNING:
            return warningColor

        case ChecklistTypeAnswer.NEGATIVE:
            return errorColor
    }
}
