import { useStoreMap } from 'effector-react'
import { $dict } from '../../get'
import { TypeManager } from '../../types'

export const useTypeManagerFromDict = (key: TypeManager) => {
    const checkResult = useStoreMap({
        store: $dict,
        keys: [key],
        fn: (dict) =>
            dict?.manager?.typeManager?.find((manager) => {
                return manager.key == key
            }),
    })

    return checkResult
}
