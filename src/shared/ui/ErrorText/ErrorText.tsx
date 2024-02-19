import { Typography } from '@mui/material'
import { FC, ReactNode, memo } from 'react'
import { errorColor } from '../../styles/variables/_export.module.scss'

type ErrorTextProps = {
    children: ReactNode
}

export const ErrorText: FC<ErrorTextProps> = memo(({ children }) => {
    return <Typography sx={{ color: errorColor }}>{children}</Typography>
})
