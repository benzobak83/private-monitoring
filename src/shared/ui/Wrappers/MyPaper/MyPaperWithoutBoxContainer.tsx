import { Divider, Paper, Stack, Typography } from '@mui/material'
import { SxProps, Theme } from '@mui/material'
import { FC } from 'react'
import { ReactNode } from 'react'

type MyPaperProps = {
    children: ReactNode
    sx?: SxProps<Theme>
    title?: ReactNode
    rightContent?: ReactNode
}

//График не отображается, если есть контейнер, только для графика создал этот компонент

export const MyPaperWithoutBoxContainer: FC<MyPaperProps> = ({
    sx,
    children,
    title,
    rightContent,
}) => {
    return (
        <Paper
            sx={{
                padding: '1rem',
                borderRadius: '1rem',
                ...sx,
            }}
            elevation={2}
        >
            <>
                {title && (
                    <>
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems="center"
                            sx={{ mb: 1 }}
                        >
                            <Typography variant="h2" sx={{ mr: 1 }}>
                                {title}
                            </Typography>
                            {rightContent}
                        </Stack>
                        <Divider sx={{ mb: 1 }} />
                    </>
                )}

                {children}
            </>
        </Paper>
    )
}
