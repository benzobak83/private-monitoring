import { useStoreMap } from 'effector-react'
import { ResultCheckIds } from '@entities/Check'
import { $dict } from '../../get'

export const useCheckResultByIdFromDict = (id: ResultCheckIds) => {
    const checkResult = useStoreMap({
        store: $dict,
        keys: [id],
        fn: (dict) =>
            dict?.check?.typeResult?.find((result) => {
                return result.id == id
            }),
    })

    return checkResult
}
