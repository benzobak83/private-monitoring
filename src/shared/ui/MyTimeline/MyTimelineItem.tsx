import {
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from '@mui/lab'
import { FC, ReactNode, memo } from 'react'

type MyTimelineItemProps = {
    value: ReactNode
    subValue: ReactNode
    color?: string
}

export const MyTimelineItem: FC<MyTimelineItemProps> = memo(
    ({ value, subValue, color }) => {
        return (
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    color="text.secondary"
                >
                    {subValue}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector sx={{ bgcolor: color }} />
                    <TimelineDot sx={{ bgcolor: color }} />
                    <TimelineConnector sx={{ bgcolor: color }} />
                </TimelineSeparator>
                <TimelineContent sx={{ m: 'auto 0' }}>{value}</TimelineContent>
            </TimelineItem>
        )
    }
)
