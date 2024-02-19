import { Theme } from '@emotion/react'
import { Button, ButtonProps, CircularProgress, SxProps } from '@mui/material'
import { FC, ReactNode, memo } from 'react'

type MyButtonProps = {
    isLoading?: boolean
    children: ReactNode
    sx?: SxProps<Theme>
} & Omit<ButtonProps, 'sx'>

export const MyButton: FC<MyButtonProps> = memo(
    ({ isLoading, children, sx = {}, ...props }) => {
        if (isLoading) {
            return (
                <Button
                    {...props}
                    sx={{
                        pointerEvents: 'none',
                        background: 'rgba(105, 105, 105, 0.5)',
                        ...sx,
                    }}
                >
                    {children}
                    <CircularProgress
                        size={20}
                        sx={{
                            position: 'absolute',
                        }}
                    />
                </Button>
            )
        }

        return (
            <Button {...props} sx={sx}>
                {children}
            </Button>
        )
    }
)
