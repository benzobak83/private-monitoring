import { Box } from '@mui/system'
import { FC, ReactNode } from 'react'
import { Loader, LoaderType } from '../../Loaders/Loader/Loader'

const basicSx = { height: 'fit-content' }

export type LoaderWrapperProps = {
    loading: boolean
    children: ReactNode
    relative?: boolean
    top?: number
}

export const LoaderWrapper: FC<LoaderWrapperProps> = ({
    loading,
    relative = true,
    children,
}) => {
    return (
        <Box
            sx={{
                ...basicSx,

                position: loading && relative ? 'relative' : undefined,
            }}
        >
            {loading && <Loader type={LoaderType.ABSOLUTE} />}
            <Box
                sx={
                    loading
                        ? {
                              opacity: '0.5',
                              pointerEvents: 'none',
                              ...basicSx,
                          }
                        : basicSx
                }
            >
                {children}
            </Box>
        </Box>
    )
}
