import CloseFullscreenOutlinedIcon from '@mui/icons-material/CloseFullscreenOutlined'
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined'
import { Box, IconButton } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect, useMemo } from 'react'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { MyTimeline } from '@shared/ui/MyTimeline/MyTimeline'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { LOG_COLORS } from '../../lib/logColors'
import { LOG_ICONS } from '../../lib/logIcons'
import { $logsOfDefect, getLogsOfDefect } from '../../model/getLogs'

type DefectTimelineProps = {
    fullMode: boolean
    setFullMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const DefectTimeline: FC<DefectTimelineProps> = ({
    fullMode,
    setFullMode,
}) => {
    const logsOfDefect = useStore($logsOfDefect)

    const { id } = useDefaultParams()

    const onFullMode = () => {
        setFullMode(true)
    }
    const offFullMode = () => {
        setFullMode(false)
    }

    const logsWithColorsAndIcons = useMemo(() => {
        return logsOfDefect.map((log) => {
            return {
                ...log,
                icon: LOG_ICONS[log.stage.id],
                color: LOG_COLORS[log.stage.id],
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logsOfDefect])

    useEffect(() => {
        getLogsOfDefect(id)
    }, [id])

    return (
        <MyPaper
            title="Логи"
            rightContent={
                fullMode ? (
                    <IconButton onClick={offFullMode} size="small">
                        <CloseFullscreenOutlinedIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={onFullMode} size="small">
                        <OpenInFullOutlinedIcon />
                    </IconButton>
                )
            }
        >
            <Box
                sx={{
                    height: fullMode ? '72vh' : '40vh',
                    overflow: 'auto',
                    transition: 'height 0.3s',
                }}
            >
                <MyTimeline history={logsWithColorsAndIcons} />
            </Box>
        </MyPaper>
    )
}
