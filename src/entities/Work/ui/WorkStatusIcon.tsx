import LensIcon from '@mui/icons-material/Lens'
import { Box } from '@mui/material'
import { FC } from 'react'

type WorkStatusIconProps = {
    workIsBusy: boolean
}

export const WorkStatusIcon: FC<WorkStatusIconProps> = ({ workIsBusy }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                minWidth: '31px',
            }}
        >
            <LensIcon
                color={workIsBusy ? 'error' : 'success'}
                fontSize="large"
            />
        </Box>
    )
}
