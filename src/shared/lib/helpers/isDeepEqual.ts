import { isEqual } from 'lodash'

export const isDeepEqual = (
    object1: Record<string, any>,
    object2: Record<string, any>
) => {
    return Object.entries(object1).reduce(
        (diff, [key, value]) =>
            isEqual(object2[key], value) ? diff : { ...diff, [key]: value },
        {}
    )
}
