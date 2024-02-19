import { useStoreMap } from 'effector-react'
import { $dict } from '../../get'

export const useAgreementAnswerByDict = () =>
    useStoreMap($dict, (dict) => dict.malfunction.diagnosticAgreementAnswer)
