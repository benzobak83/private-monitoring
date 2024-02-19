import { SxProps, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { FC, ReactNode, memo } from 'react'
import { Link } from 'react-router-dom'

export type ViewFieldPrimitiveValueProps = {
    label: string
    value: ReactNode
    emptyText?: string
    link?: string
    fixWidth?: number
    visibleEmpty?: boolean
    row?: boolean
    isRub?: boolean
    noWrap?: boolean
    sx?: SxProps
    valueColor?: string
}

const EMPTY_TEXT = 'не указано'

export const ViewFieldPrimitiveValue: FC<ViewFieldPrimitiveValueProps> = memo(
    ({
        label,
        value,
        fixWidth,
        noWrap,
        row = true,
        valueColor,
        visibleEmpty = true,
        link,
        isRub,
        emptyText = EMPTY_TEXT,
        sx,
    }) => {
        return (
            <>
                {(value || visibleEmpty) && (
                    <Stack
                        sx={sx}
                        direction={row ? 'row' : 'column'}
                        spacing={0.8}
                        alignItems={'flex-start'}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                minWidth: fixWidth
                                    ? `${fixWidth}px`
                                    : 'fit-content',
                                maxWidth: fixWidth
                                    ? `${fixWidth}px`
                                    : 'fit-content',
                                whiteSpace: noWrap ? 'nowrap' : 'normal',
                            }}
                        >
                            {label}:
                        </Typography>

                        {link && value ? (
                            <Link to={link}>
                                <Typography
                                    sx={{
                                        position: 'relative',
                                        top: '-2px',
                                        color: valueColor,
                                        whiteSpace: noWrap
                                            ? 'nowrap'
                                            : 'normal',
                                    }}
                                >
                                    {value || emptyText}
                                </Typography>
                            </Link>
                        ) : (
                            <Typography
                                sx={{
                                    position: 'relative',
                                    color: valueColor,
                                    top: '-2px',
                                    whiteSpace: noWrap ? 'nowrap' : 'normal',
                                }}
                            >
                                {value || emptyText}
                                {isRub && value && '₽'}
                            </Typography>
                        )}
                    </Stack>
                )}
            </>
        )
    }
)
