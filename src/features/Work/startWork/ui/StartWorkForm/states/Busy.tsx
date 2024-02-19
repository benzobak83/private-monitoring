import { Button, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { TStartWorkContext } from '@entities/Work'
import { TVoidFunc } from '@shared/types/Global'

type BusyProps = {
    work: TStartWorkContext
    handleSubmit: TVoidFunc
}

export const Busy: FC<BusyProps> = ({ work, handleSubmit }) => {
    return (
        <Stack spacing={2}>
            <Typography>
                Объект{' '}
                <Typography variant="h6" component={'span'}>
                    {work?.object?.name}
                </Typography>{' '}
                находится в работу у {work?.user?.name}
            </Typography>
            <Typography>
                Если вы выберете этот объект, то смена {work?.user?.name} будет
                завершена. Продолжить?
            </Typography>

            <Button variant="contained" onClick={handleSubmit}>
                Да, всё равно выбрать
            </Button>
        </Stack>
    )
}
