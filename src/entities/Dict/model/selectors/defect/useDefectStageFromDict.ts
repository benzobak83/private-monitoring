import { useStoreMap } from 'effector-react'
import { $dict } from '../../get'

export const useDefectStageFromDict = () =>
    useStoreMap($dict, (dict) => dict?.malfunction.stage)
