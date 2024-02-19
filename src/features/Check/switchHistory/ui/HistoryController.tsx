import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { Stack, IconButton, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { CheckModel } from '@entities/Check'
import { useSwitchHistoryContext } from '../model/SwitchHistoryProvider'

export const HistoryController: FC = () => {
    const { rows: history } = useStore(CheckModel.$historyTableData)
    const checkOfHistory = useStore(CheckModel.$checkOfHistory)

    const { setHistoryId } = useSwitchHistoryContext()

    const indexOfCurrentCheckOfHistory = history?.findIndex((historyItem) => {
        return historyItem.id === checkOfHistory.id
    })

    const handleNextClick = () => {
        const nextCheckOfHistoryId =
            history?.[indexOfCurrentCheckOfHistory + 1]?.id || history?.[0]?.id

        setHistoryId(nextCheckOfHistoryId)
    }
    const handlePrevClick = () => {
        const nextCheckOfHistoryId =
            history?.[indexOfCurrentCheckOfHistory - 1]?.id ||
            history?.[history.length - 1]?.id

        setHistoryId(nextCheckOfHistoryId)
    }

    if (!history?.length) return null

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <IconButton onClick={handlePrevClick}>
                <KeyboardDoubleArrowLeftIcon color="primary" />
            </IconButton>
            <Typography
                variant="h4"
                sx={{ width: '115px', textAlign: 'center' }}
            >
                {checkOfHistory.lastCheck || 'Не указано'}
            </Typography>
            <IconButton onClick={handleNextClick}>
                <KeyboardDoubleArrowRightIcon color="primary" />
            </IconButton>
        </Stack>
    )
}
