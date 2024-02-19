import { FC } from 'react'
import { PickMasterForRegulatoryWorkBtn } from '@/features/RegulatoryWork/pickMasterForRegulatoryWork'

type MasterCellProps = {
    regulatoryWork: any
}

export const MasterCell: FC<MasterCellProps> = ({ regulatoryWork }) => {
    return <PickMasterForRegulatoryWorkBtn regulatoryWork={regulatoryWork} />
}
