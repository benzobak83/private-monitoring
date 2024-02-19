import { Stack } from '@mui/material'
import { FC } from 'react'
import { AdditionalAuthForm } from '@/features/Auth/additionalAuth'

const AdditionalAuth: FC = () => {
    return (
        <Stack justifyContent={'center'} alignItems={'center'} height={'100vh'}>
            <AdditionalAuthForm />
        </Stack>
    )
}

export default AdditionalAuth
