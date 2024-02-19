import { Stack, Typography, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { FC, memo } from 'react'

type MyTimelineTitleItemProps = {
    title: string
    color?: string
    Icon?: OverridableComponent<SvgIconTypeMap<Record<string, any>, 'svg'>>
}

export const MyTimelineTitleItem: FC<MyTimelineTitleItemProps> = memo(
    ({ title, color, Icon }) => {
        return (
            <Stack
                sx={{
                    textAlign: 'center',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                spacing={0.5}
                direction={'row'}
                alignItems={'center'}
            >
                <Typography variant="h6" sx={{ color }}>
                    {title}
                </Typography>
                {Icon && <Icon sx={{ color }} />}
            </Stack>
        )
    }
)
