import { useStore } from 'effector-react'
import { FC, ReactNode } from 'react'
import { $currentWork } from '../../model/getCurrentWork'
import { WorkNotStarted } from './states/WorkNotStarted'
import { WorkStarted } from './states/WorkStarted'

type WorkStatusForHeaderProps = {
    completeWorkBtnSlot: ReactNode
}

export const WorkStatusForHeader: FC<WorkStatusForHeaderProps> = ({
    completeWorkBtnSlot,
}) => {
    const work = useStore($currentWork)

    if (work.isWorkInProgress) {
        return <WorkStarted completeWorkBtnSlot={completeWorkBtnSlot} />
    } else {
        return <WorkNotStarted />
    }
}
