import { Stack, Typography } from '@mui/material'
import { FC } from 'react'

type DatesCellProps = {
    dates: { dateStart: string; dateEnd: string }[]
}

export const DatesCell: FC<DatesCellProps> = ({ dates }) => {
    return (
        <Stack spacing={0.5}>
            {dates.map((date, i) => {
                return (
                    <Typography key={i}>
                        {date.dateStart} - {date.dateEnd || 'не указано'}
                    </Typography>
                )
            })}
        </Stack>
    )
}
