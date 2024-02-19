import { Box } from '@mui/material'
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
import { ROUTES } from '@shared/lib/consts/routes'
import { HEIGHT_FOR_TABLE_WITH_FILTER } from '@shared/lib/consts/tableHeight'
import { usePagination } from '@shared/lib/hooks/usePagination'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'

const BREAD_CRUMBS: TBreadCrumb[] = [
    { id: 1, label: 'Неисправности', link: ROUTES.defect.general },
]

const DefectList: FC = () => {
    const getDefectListTableDataFxIsLoading = useStore(
        getDefectListTableDataFx.pending
    )
    const defectListTableData = useStore($defectListTableData)
    const defectFilter = useStoreMap(
        $filter,
        (store) => store[FilterKeys.DEFECT]
    )

    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } =
        usePagination()

    useEffect(() => {
        getDefectListTableDataFx({
            page,
            limit: rowsPerPage,
            filter: defectFilter,
        })
    }, [page, rowsPerPage, defectFilter])

    useEffect(() => {
        return () => resetDefectListTabledata()
    }, [])
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />
            <DefectFilter />
            <DefectTable
                height={HEIGHT_FOR_TABLE_WITH_FILTER}
                defectListTableData={defectListTableData}
                page={page}
                limit={rowsPerPage}
                loading={getDefectListTableDataFxIsLoading}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Box>
    )
}
export default DefectList
