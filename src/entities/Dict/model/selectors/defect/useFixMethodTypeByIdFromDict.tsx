import { useStoreMap } from 'effector-react'
import { FixMethodTypeIds } from '@entities/Defect'
import { $dict } from '../../get'

export const useFixMethodTypeByIdFromDict = (id: FixMethodTypeIds) => {
    const method = useStoreMap({
        store: $dict,
        keys: [id],
        fn: (dict) =>
            dict.malfunction.method.find((method) => {
                return method.id == id
            }),
    })

    return method
}
