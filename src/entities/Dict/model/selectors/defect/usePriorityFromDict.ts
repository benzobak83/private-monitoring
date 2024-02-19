import { useStoreMap } from 'effector-react'
import { $dict } from '../../get'

export const usePriorityFromDict = () =>
    useStoreMap($dict, (dict) => dict.malfunction.malfunctionPriority)
