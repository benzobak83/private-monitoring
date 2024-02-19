import { Stack, Button, CircularProgress } from '@mui/material'
import { FC, useCallback, useState } from 'react'
import { updateDataIn1CFullFx } from '../model/update'

type updateDataIn1CFullChangedProps = {
    service: string
}

export const UpdateDataIn1CFullChangedBtn: FC<
    updateDataIn1CFullChangedProps
> = ({ service }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onHandleClickUpdate = useCallback(() => {
        setIsLoading(true)
        updateDataIn1CFullFx({ service }).finally(() => setIsLoading(false))
    }, [service])

    return (
        <Stack alignItems={'center'}>
            {!isLoading ? (
                <Button
                    size="small"
                    disabled={isLoading}
                    onClick={onHandleClickUpdate}
                >
                    обновить
                </Button>
            ) : (
                <CircularProgress size={24} sx={{ margin: 0.4 }} />
            )}
        </Stack>
    )
}
