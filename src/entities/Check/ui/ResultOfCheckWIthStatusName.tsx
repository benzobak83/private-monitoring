import { Chip, Typography } from '@mui/material'
import { FC } from 'react'
import { chipMultilineSx } from '@shared/sx'
import { getColorByResult } from '../lib/getColorByResult'
import { ResultCheckIds } from '../model/types/types'

type ResultOfCheckWIthStatusNameProps = {
    result: { id: ResultCheckIds; name: string }
}

export const ResultOfCheckWIthStatusName: FC<
    ResultOfCheckWIthStatusNameProps
> = ({ result }) => {
    if (!result?.id) {
        return <Typography>-</Typography>
    }
    return (
        <Chip
            label={result?.name}
            color={getColorByResult(result.id)}
            sx={chipMultilineSx}
        />
    )
}
