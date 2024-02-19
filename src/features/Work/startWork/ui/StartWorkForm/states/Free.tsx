import { Button, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { TStartWorkContext } from '@entities/Work'
import { TVoidFunc } from '@shared/types/Global'

type FreeProps = {
    work: TStartWorkContext
    handleSubmit: TVoidFunc
}

export const Free: FC<FreeProps> = ({ work, handleSubmit }) => {
    return (
        <Stack spacing={2}>
            <Typography>
                Вы хотите начать смену на объекте:{' '}
                <Typography component={'span'} variant="h6">
                    {work.object.name}
                </Typography>
            </Typography>
            <Button variant="contained" onClick={handleSubmit}>
                Начать смену
            </Button>
        </Stack>
    )
}
