import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { ResultCheckIds } from '../model/types/types'
import { ResultOfCheck } from './ResultOfCheck'

type ResultOfCheckWithNameEntityProps = {
    name: string
    result: ResultCheckIds
}

export const ResultOfCheckWithNameEntity: FC<
    ResultOfCheckWithNameEntityProps
> = ({ result, name }) => {
    return (
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <ResultOfCheck typeResult={result} />
            <Typography>{name}</Typography>
        </Stack>
    )
}
