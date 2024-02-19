import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Divider,
    Paper,
    Stack,
    Typography,
    Box,
    IconButton,
} from '@mui/material'
import { SxProps, Theme, Collapse } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { ReactNode } from 'react'
import { useInit } from '../../../lib/hooks/useInit'

type MyPaperProps = {
    children: ReactNode
    sx?: SxProps<Theme>
    accordion?: boolean
    open?: boolean
    borderRadius?: boolean
    title?: ReactNode
    rightContent?: ReactNode
}

export const MyPaper: FC<MyPaperProps> = ({
    sx,
    children,
    accordion = false,
    borderRadius = true,
    open: openFromProps = false,
    title,
    rightContent,
}) => {
    const [open, setOpen] = useState(accordion ? openFromProps : true)

    const { init } = useInit()

    const toggleOpen = () => {
        setOpen((prev) => !prev)
    }

    useEffect(() => {
        if (init && openFromProps) return
        setOpen(!accordion)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accordion])

    return (
        <Paper
            sx={{
                padding: !open ? '1px 1rem' : '1rem',
                borderRadius: borderRadius ? '1rem' : '0px',
                ...sx,
            }}
            elevation={2}
        >
            <Box>
                {title && (
                    <>
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems="center"
                            onClick={accordion ? toggleOpen : undefined}
                            sx={{
                                mb: open ? 1 : 0,
                                cursor: accordion ? 'pointer' : 'inherit',
                            }}
                        >
                            <Typography variant="h2" sx={{ mr: 1 }}>
                                {title}
                            </Typography>
                            {rightContent}
                            {accordion && (
                                <IconButton size="small">
                                    <ExpandMoreIcon
                                        sx={{
                                            transform: open
                                                ? 'rotate(180deg)'
                                                : '',
                                            transition: 'transform 0.2s',
                                        }}
                                    />
                                </IconButton>
                            )}
                        </Stack>
                        {open && <Divider sx={{ mb: 1 }} />}
                    </>
                )}
                <Collapse in={open}>{children}</Collapse>
            </Box>
        </Paper>
    )
}
