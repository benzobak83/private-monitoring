import { TypeManager } from '@entities/Dict'
import { TOfficial } from '../model/types'

export const getResponsiblePersonByKey = (
    persons: TOfficial[],
    key: TypeManager
) => {
    return persons.find((person) => person.key === key)?.users?.[0]
}
