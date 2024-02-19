import ErrorIcon from '@mui/icons-material/Error'
import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { ResultOfCheck, TCheck } from '@entities/Check'

type StateStatusOfObjectNavProps = {
    result: TCheck['result'] | undefined
}

export const StateStatusOfObjectNav: FC<StateStatusOfObjectNavProps> = ({
    result,
}) => {
    if (result?.id) {
        return (
            <Stack alignItems={'center'} direction="row" spacing={1}>
                <Typography>Состояние</Typography>
                <ResultOfCheck
                    typeResult={result.id}
                    iconSx={{ width: '24px', height: '24px' }}
                />
            </Stack>
        )
    } else
        return (
            <Stack alignItems={'center'} direction="row" spacing={1}>
                <Typography>Состояние</Typography>
                <ErrorIcon color="warning" />
            </Stack>
        )
}
