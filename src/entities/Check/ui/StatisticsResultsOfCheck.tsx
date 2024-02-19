import { Stack, Typography, Box } from '@mui/material'
import { FC } from 'react'
import { ResultCheckIds, TStatisticsResult } from '../model/types/types'
import { ResultOfCheck } from './ResultOfCheck'

type StatisticsResultsOfCheckProps = {
    results: TStatisticsResult
}

export const StatisticsResultsOfCheck: FC<StatisticsResultsOfCheckProps> = ({
    results,
}) => {
    return (
        <Stack direction={'row'} spacing={0.5} alignItems="centers">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '40px',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h3">{results.all}</Typography>
            </Box>
            <ResultOfCheck
                typeResult={ResultCheckIds.OK}
                count={results.success}
            />
            <ResultOfCheck
                typeResult={ResultCheckIds.WARNING}
                count={results.warning}
            />
            <ResultOfCheck
                typeResult={ResultCheckIds.NEGATIVE}
                count={results.negative}
            />
        </Stack>
    )
}
