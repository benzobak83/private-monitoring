import { Box } from '@mui/material'
import { FC, ReactNode } from 'react'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'

type BlockWrapperProps = {
    title?: string
    children?: ReactNode
    rightContent?: ReactNode
    loading: boolean
}

const paperSx = {
    flexBasis: '29%',
}

const scrollSx = {
    overflowY: 'auto',
    overflowX: 'visible',
    height: '63vh',
    padding: '5px',
}

export const BlockWrapper: FC<BlockWrapperProps> = ({
    title,
    children,
    loading,
    rightContent,
}) => {
    return (
        <MyPaper
            sx={{ ...paperSx, flexBasis: '40%' }}
            title={title}
            rightContent={rightContent}
        >
            <LoaderWrapper loading={loading}>
                <Box sx={scrollSx}>{children}</Box>
            </LoaderWrapper>
        </MyPaper>
    )
}
