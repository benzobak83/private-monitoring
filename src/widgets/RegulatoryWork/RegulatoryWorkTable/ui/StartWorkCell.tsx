import { FC } from 'react'
import { StartRegulatoryWorkBtn } from '@/features/RegulatoryWork/startRegulatoryWork'
import { TRegulatoryWorkListItem } from '@entities/RegulatoryWork'

type StartWorkCellProps = {
    regulatoryWork: TRegulatoryWorkListItem
}

export const StartWorkCell: FC<StartWorkCellProps> = ({ regulatoryWork }) => {
    return <StartRegulatoryWorkBtn regulatoryWork={regulatoryWork} />
}
