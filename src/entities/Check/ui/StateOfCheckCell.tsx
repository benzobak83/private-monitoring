import { Chip } from '@mui/material'
import { FC } from 'react'
import { StateCheckIds } from '../model/types/types'

const COLORS = {
    [StateCheckIds.NEW]: 'primary',
    [StateCheckIds.NOT_COMPLETED]: 'warning',
    [StateCheckIds.COMPLETED]: 'success',
} as const

type StateOfCheckCellProps = {
    state: { id: StateCheckIds; name: string }
}

export const StateOfCheckCell: FC<StateOfCheckCellProps> = ({ state }) => {
    if (!state) {
        return '-'
    }

    return <Chip label={state.name} size="small" color={COLORS[state.id]} />
}
