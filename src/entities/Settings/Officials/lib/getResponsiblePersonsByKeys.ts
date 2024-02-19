import { TypeManager } from '@entities/Dict'
import { TOfficial } from '../model/types'

export const getResponsiblePersonsByKeys = (
    persons: TOfficial[] = [],
    keys: TypeManager[] = []
) => {
    if (!persons.length) return []

    return persons.filter((person) => keys.includes(person.key))
}
