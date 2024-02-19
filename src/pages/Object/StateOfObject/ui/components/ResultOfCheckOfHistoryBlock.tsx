import { Stack, Typography, Box } from '@mui/material'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import {
    HistoryController,
    useSwitchHistoryContext,
} from '@/features/Check/switchHistory'
import { CheckModel, ViewInspectionBlock } from '@entities/Check'
import { useInit } from '@shared/lib/hooks/useInit'
import { BlockWrapper } from './BlockWrapper'

export const ResultOfCheckOfHistoryBlock = () => {
    const checkOfHistory = useStore(CheckModel.$checkOfHistory)
    const [loading, setLoading] = useState<boolean>(true)

    const { init } = useInit()

    const { historyId } = useSwitchHistoryContext()

    useEffect(() => {
        if (!historyId) {
            return setLoading(false)
        }

        setLoading(true)
        CheckModel.getCheckOfHistoryFx(historyId).finally(() =>
            setLoading(false)
        )
    }, [historyId])

    if (loading && init) {
        return <BlockWrapper loading={true} />
    }
    return (
        <BlockWrapper
            rightContent={<HistoryController />}
            title={checkOfHistory?.user?.name || 'Просмотр результата'}
            loading={loading}
        >
            <Stack spacing={2} sx={{ height: '100%' }}>
                {checkOfHistory?.result ? (
                    <ViewInspectionBlock check={checkOfHistory} />
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4">Результата нет</Typography>
                    </Box>
                )}
            </Stack>
        </BlockWrapper>
    )
}
