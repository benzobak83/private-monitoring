import { useStore } from 'effector-react'
import { FC } from 'react'
import { $currentWork } from '@entities/Work/model/getCurrentWork'
import { WorkNotStarted } from './states/WorkNotStarted'
import { WorkStarted } from './states/WorkStarted'

export const WorkStatus: FC = () => {
    const work = useStore($currentWork)

    return work.isWorkInProgress ? <WorkStarted /> : <WorkNotStarted />
}
