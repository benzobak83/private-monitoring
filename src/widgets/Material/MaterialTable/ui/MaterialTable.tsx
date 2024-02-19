import { useStore, useStoreMap } from 'effector-react'
import { FC, useEffect } from 'react'
import { $filter, FilterKeys, resetFilter } from '@entities/Filter'
import {
    $materialList,
    getMaterialListFx,
    resetMaterialList,
} from '@entities/Material'
import { HEIGHT_FOR_TABLE_WITH_FILTER_AND_TITLE_PAGE } from '@shared/lib/consts/tableHeight'
import { MESSAGES_FOR_LOG, emitErrorLog } from '@shared/notification'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { columns } from '../lib/columns'

export const MaterialTable: FC = () => {
    const materialList = useStore($materialList)
    const materialsFilter = useStoreMap(
        $filter,
        (filter) => filter[FilterKeys.MATERIAL]
    )
    const getMaterialListTableDataFxIsLoading = useStore(
        getMaterialListFx.pending
    )

    useEffect(() => {
        if (!materialsFilter.uuid) {
            emitErrorLog(undefined, MESSAGES_FOR_LOG.error.material.needMol)
        }
        getMaterialListFx(materialsFilter)
    }, [materialsFilter])

    useEffect(() => {
        return () => {
            resetMaterialList()
            resetFilter(FilterKeys.MATERIAL)
        }
    }, [])

    return (
        <>
            <MyStyledDataGrid
                columns={columns}
                loading={getMaterialListTableDataFxIsLoading}
                rows={materialList}
                getRowId={(row) => row.uuid}
                height={HEIGHT_FOR_TABLE_WITH_FILTER_AND_TITLE_PAGE}
            />
        </>
    )
}
