import { useStoreMap } from 'effector-react'
import { DefectStageIds } from '@entities/Defect'
import { $dict } from '../../get'

export const useDefectStageByIdFromDict = (id: DefectStageIds) => {
    const stage = useStoreMap({
        store: $dict,
        keys: [id],
        fn: (dict) =>
            dict.malfunction.stage.find((stage) => {
                return stage.id == id
            }),
    })

    return stage
}
