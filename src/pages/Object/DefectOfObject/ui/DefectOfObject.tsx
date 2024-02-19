import { Stack } from '@mui/material'
import { useStore, useStoreMap } from 'effector-react'
import { FC, useEffect } from 'react'
import { DefectFilter } from '@/widgets/Defect/DefectFilter'
import { DefectTable } from '@/widgets/Defect/DefectTable'
import {
    $defectListTableData,
    getDefectListTableDataFx,
    resetDefectListTabledata,
} from '@entities/Defect'
import { $filter, FilterKeys } from '@entities/Filter'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { usePagination } from '@shared/lib/hooks/usePagination'

const DefectOfObject: FC = () => {
    const getDefectListTableDataFxIsLoading = useStore(
        getDefectListTableDataFx.pending
    )
    const defectListTableData = useStore($defectListTableData)

    const defectFilter = useStoreMap(
        $filter,
        (store) => store[FilterKeys.DEFECT]
    )

    const { id } = useDefaultParams()

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    useEffect(() => {
        getDefectListTableDataFx({
            page,
            limit: rowsPerPage,
            filter: {
                ...defectFilter,
                objectId: id,
                notFinished: true,
            },
        })
    }, [page, rowsPerPage, defectFilter, id])

    useEffect(() => {
        return () => resetDefectListTabledata()
    }, [])
    return (
        <Stack>
            <DefectFilter />
            <DefectTable
                height={'62vh'}
                loading={getDefectListTableDataFxIsLoading}
                defectListTableData={defectListTableData}
                page={page}
                limit={rowsPerPage}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Stack>
    )
}
export default DefectOfObject
