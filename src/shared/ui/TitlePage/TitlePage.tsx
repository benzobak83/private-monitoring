import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Stack, Typography } from '@mui/material'
import { FC, ReactNode, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { hoverOpacitySx } from '../../sx/'

export type TitlePageProps = {
    children: ReactNode
    back?: boolean
    backUrl?: string
    bottomMarginNeed?: boolean
}

export const TitlePage: FC<TitlePageProps> = memo(
    ({ children, back = false, backUrl, bottomMarginNeed = true }) => {
        const navigate = useNavigate()

        const goBack = useCallback(() => {
            if (backUrl) {
                navigate(backUrl)
            } else {
                navigate(-1)
            }
        }, [navigate, backUrl])

        return (
            <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={2}
                sx={{ mb: bottomMarginNeed ? 2 : 0, ml: 1 }}
            >
                {(back || backUrl) && (
                    <ArrowBackIcon onClick={goBack} sx={hoverOpacitySx} />
                )}
                <Typography variant="h1">{children}</Typography>
            </Stack>
        )
    }
)
