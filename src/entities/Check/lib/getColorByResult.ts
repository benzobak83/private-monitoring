import { ResultCheckIds } from '../model/types/types'

const resultColors = {
    [ResultCheckIds.OK]: 'success',
    [ResultCheckIds.WARNING]: 'warning',
    [ResultCheckIds.NEGATIVE]: 'error',
} as const

export const getColorByResult = (result: ResultCheckIds) => {
    return resultColors[result]
}
