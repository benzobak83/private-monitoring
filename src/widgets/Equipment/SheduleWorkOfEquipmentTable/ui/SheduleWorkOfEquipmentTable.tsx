import { FC } from 'react'
import { TChecklistOfTypeOfEquipment } from '@entities/Settings/TypesOfEquipment'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { columns } from '../lib/columns'

type SheduleWorkOfEquipmentTableProps = {
    checklists: TChecklistOfTypeOfEquipment[] | never[]
}

export const SheduleWorkOfEquipmentTable: FC<
    SheduleWorkOfEquipmentTableProps
> = ({ checklists = [] }) => {
    return (
        <MyStyledDataGrid
            rows={checklists || []}
            columns={columns}
            sx={{ height: '26vh' }}
        />
    )
}
