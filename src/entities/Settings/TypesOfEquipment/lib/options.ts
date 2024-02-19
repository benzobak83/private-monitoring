import { ChecklistTypeControl } from '../../Checklist'

export const REGULARLY_CONTROL_OPTIONS = [
    { value: true, label: 'Регулярная' },
    { value: false, label: 'Разовая' },
]

export const TYPE_CONTROL_OPTIONS = [
    { id: ChecklistTypeControl.DATE, name: 'По дате' },
    { id: ChecklistTypeControl.MILAGE, name: 'По пробегу' },
]
