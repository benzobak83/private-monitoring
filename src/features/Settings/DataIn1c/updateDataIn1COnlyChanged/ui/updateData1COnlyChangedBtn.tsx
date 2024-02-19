import { Button, CircularProgress, Stack } from '@mui/material'
import { FC, useCallback, useState } from 'react'
import { updateDataOnlyChangedFx } from '../model/update'

type updateDataIn1cProps = {
    service: string
}

export const UpdateDataIn1cOnlyChangedBtn: FC<updateDataIn1cProps> = ({
    service,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onHandleClickUpdate = useCallback(() => {
        setIsLoading(true)
        updateDataOnlyChangedFx({ service }).finally(() => setIsLoading(false))
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
