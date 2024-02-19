import { useStoreMap } from 'effector-react'
import { $dict } from '../../get'

export const useTypeResultOfCheckFromDict = () =>
    useStoreMap($dict, (dict) => dict?.check?.typeResult)
