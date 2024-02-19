import { FC } from 'react'
import { ChecklistTypeAnswer } from '../model/types'
import { StandartRadioColor } from './StandartRadioColor'

type AnswerTypePickerProps = {
    name: string
}

export const OPTIONS = [
    { id: ChecklistTypeAnswer.OK, label: '' },
    { id: ChecklistTypeAnswer.WARNING, label: '' },
    { id: ChecklistTypeAnswer.NEGATIVE, label: '' },
]

export const AnswerTypePicker: FC<AnswerTypePickerProps> = ({ name }) => {
    return <StandartRadioColor name={name} options={OPTIONS} row label="" />
}
