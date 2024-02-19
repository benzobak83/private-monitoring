import { Chip } from '@mui/material'
import { FC } from 'react'
import { DefectTypeIds } from '../model/types/types'

type DefectTypeChipProps = {
    type: DefectTypeIds
    label: string
}

const COLORS = {
    [DefectTypeIds.WARNING]: 'warning',
    [DefectTypeIds.NEGATIVE]: 'error',
} as const

export const DefectTypeChip: FC<DefectTypeChipProps> = ({ type, label }) => {
    return <Chip color={COLORS[type]} label={label} size={'small'} />
}
