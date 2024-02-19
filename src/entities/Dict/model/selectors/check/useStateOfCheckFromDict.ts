import { useStoreMap } from 'effector-react'
import { $dict } from '../../get'

export const useStateOfCheckFromDict = () =>
    useStoreMap($dict, (dict) => dict?.check?.state)
