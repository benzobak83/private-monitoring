import { Timeline } from '@mui/lab'
import { Stack, SvgIconTypeMap, Typography } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { FC, memo } from 'react'
import { TIdWithName } from '../../types/Global'
import { MyTimelineItem } from './MyTimelineItem'
import { MyTimelineTitleItem } from './MyTimelineTitleItem'

export type THistoryItem = {
    stage: TIdWithName
    logs: TLog[]
    icon?: OverridableComponent<SvgIconTypeMap<Record<string, any>, 'svg'>>
    color?: string
}

export type TLog = {
    id: number
    createdAt: string
    action: string
    user: TIdWithName
}

type MyTimelineProps = {
    history: THistoryItem[]
}

export const MyTimeline: FC<MyTimelineProps> = memo(({ history }) => {
    return (
        <Timeline position="left">
            {history.map((item) => {
                return (
                    <>
                        <MyTimelineTitleItem
                            title={item.stage.name}
                            key={item.stage.id}
                            Icon={item.icon}
                            color={item.color}
                        />
                        {item.logs.map((log) => {
                            return (
                                <MyTimelineItem
                                    key={log.id}
                                    color={item.color}
                                    value={log.action}
                                    subValue={
                                        <Stack textAlign={'center'}>
                                            <Typography>
                                                {log.createdAt}
                                            </Typography>
                                            <Typography>
                                                {log.user.name}
                                            </Typography>
                                        </Stack>
                                    }
                                />
                            )
                        })}
                    </>
                )
            })}
        </Timeline>
    )
})

// const item = history[Number(key) as keyof typeof history]
// return (
//     <>
//         <MyTimelineTitleItem
//             title={item.name}
//             key={item.id}
//             Icon={item.icon}
//             color={item.color}
//         />
//         {item.logs.map((log) => {
//             return (
//                 <MyTimelineItem
//                     key={log.id}
//                     color={item.color}
//                     value={log.action}
//                     subValue={log.createdAt}
//                 />
//             )
//         })}
//     </>
// )
