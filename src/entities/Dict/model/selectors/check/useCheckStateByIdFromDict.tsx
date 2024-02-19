import { useStore } from 'effector-react'
import { StateCheckIds } from '@entities/Check'
import { $dict } from '../../get'

export const useCheckStateByIdFromDict = (id: StateCheckIds) => {
    const dict = useStore($dict)
    return dict.check.state.find((state) => state.id === id)
}
