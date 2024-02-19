import { useStoreMap } from 'effector-react'
import { $dict } from '../../get'

export const useMethodsOfDefectFromDict = () =>
    useStoreMap($dict, (dict) => dict?.malfunction.method)
