import { Stack } from '@mui/material'
import { FC, ReactNode } from 'react'

const stylesDuetFields = { minWidth: '600px' }

export type DuetFieldsWrapperProps = {
    children: ReactNode
    big?: boolean
}

export const DuetFieldsWrapper: FC<DuetFieldsWrapperProps> = ({
    children,
    big = true,
}) => {
    return (
        <Stack direction={'row'} spacing={1} sx={big ? stylesDuetFields : null}>
            {children}
        </Stack>
    )
}
