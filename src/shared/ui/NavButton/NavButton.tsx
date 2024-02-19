import { Button, Box, SxProps, Theme, ButtonProps } from '@mui/material'
import { FC, ReactNode, memo } from 'react'
import { Link } from 'react-router-dom'

type NavButtonProps = {
    children: ReactNode
    link: string
    sx?: SxProps<Theme>
} & ButtonProps

export const NavButton: FC<NavButtonProps> = memo(
    ({ link, children, sx, ...props }) => {
        return (
            <Box>
                <Link to={link}>
                    <Button
                        sx={{ ...sx }}
                        size={'large'}
                        variant="contained"
                        {...props}
                    >
                        {children}
                    </Button>
                </Link>
            </Box>
        )
    }
)
