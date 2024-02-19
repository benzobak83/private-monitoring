import { Alert, AlertColor, Stack, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { $logs, removeLog } from '../model/logger'

type ILogsMatching = {
    [colorKey: string]: AlertColor
}

const logsMatching: ILogsMatching = {
    logic: 'error',
    validation: 'warning',
    critical: 'error',
}

const UserLoggerStyle = {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
    header: '20px',
    gap: '12px',
    zIndex: 100000,
}
export function Logger() {
    const logs = useStore($logs)

    const handleLogRemove = useCallback(
        (errorId: string) => () => {
            removeLog(errorId)
            setTimeout(() => {
                removeLog(errorId)
            }, 1000)
        },
        []
    )

    return (
        <>
            <Stack sx={UserLoggerStyle}>
                {logs.map(({ message, type, id }) => (
                    <Alert
                        onClose={handleLogRemove(id)}
                        onLoad={handleLogRemove(id)}
                        severity={logsMatching[type]}
                        key={id}
                    >
                        <Typography>{message}</Typography>
                    </Alert>
                ))}
            </Stack>
        </>
    )
}
