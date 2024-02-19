import { Divider, Stack, Box, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useCallback, useEffect } from 'react'
import { useSwitchHistoryContext } from '@/features/Check/switchHistory'
import { CheckModel, ResultOfCheckWithInformation } from '@entities/Check'
import { withDefaultTableParams } from '@shared/lib/helpers/withDefaultTableParams'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { primaryColor } from '@shared/styles/variables/_export.module.scss'
import { BlockWrapper } from './BlockWrapper'

const getHistoryItemSx = (active: boolean) => {
    return {
        paddingTop: '5px',
        marginTop: '0px !important',
        cursor: 'pointer',
        borderLeft: '1px solid transparent',
        borderRight: '1px solid transparent',
        '&:hover': {
            borderLeft: `1px solid ${primaryColor}`,
            borderRight: `1px solid ${primaryColor}`,
        },
        backgroundColor: active ? 'rgba(189,236,182, 0.4)' : 'trasparent',
    }
}

export const HistoryResultOfCheckBlock: FC = () => {
    const historyTableData = useStore(CheckModel.$historyTableData)

    const getHistoryTableDataFxIsPending = useStore(
        CheckModel.getHistoryTableDataFx.pending
    )

    const { historyId, setHistoryId } = useSwitchHistoryContext()

    const { id } = useDefaultParams()

    const handleClick = useCallback(
        (id: number) => {
            setHistoryId(id)
        },
        [setHistoryId]
    )

    useEffect(() => {
        CheckModel.getHistoryTableDataFx(
            withDefaultTableParams({ objectId: id })
        )
    }, [id])

    useEffect(() => {
        if (!historyTableData.rows?.length) return

        setHistoryId(historyTableData.rows?.[0]?.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setHistoryId])
    return (
        <BlockWrapper title="История" loading={getHistoryTableDataFxIsPending}>
            <Stack spacing={2} sx={{ height: '100%' }}>
                {!!historyTableData.rows?.length ? (
                    historyTableData.rows?.map((check) => {
                        return (
                            <Stack
                                key={check.id}
                                spacing={1}
                                sx={getHistoryItemSx(historyId === check.id)}
                            >
                                <ResultOfCheckWithInformation
                                    check={check}
                                    handleClick={handleClick}
                                />
                                <Divider color={primaryColor} />
                            </Stack>
                        )
                    })
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
                        <Typography variant="h4">
                            Ранее проведённых проверок нет
                        </Typography>
                    </Box>
                )}
            </Stack>
        </BlockWrapper>
    )
}
