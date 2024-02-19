import { Box, CircularProgress } from '@mui/material'
import { FC, memo } from 'react'

type LoaderUnblockInterfaceProps = {
    heightValue?: number
    type?: LoaderType
}

export enum LoaderType {
    'RELATIVE',
    'ABSOLUTE',
}

export const Loader: FC<LoaderUnblockInterfaceProps> = memo(
    ({ heightValue = 0, type = LoaderType.RELATIVE }) => {
        if (type === LoaderType.ABSOLUTE) {
            return (
                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <CircularProgress />
                </Box>
            )
        }
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: !!heightValue ? `${heightValue}px` : 'auto',
                }}
            >
                <CircularProgress />
            </Box>
        )
    }
)
