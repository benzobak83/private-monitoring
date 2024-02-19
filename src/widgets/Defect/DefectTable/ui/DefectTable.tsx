import { FC } from 'react'
import { TDefectItemOfList } from '@entities/Defect/model/types/types'
import { TTableData } from '@shared/types/Table'
import { MyStyledDataGrid } from '@shared/ui/TableComponents/MyDataGrid/MyDataGrid'
import { MyTablePagination } from '@shared/ui/TableComponents/MyTablePagination/MyTablePagination'
import { columns } from '../lib/columns'

type DefectTableProps = {
    height: string
    defectListTableData: TTableData<TDefectItemOfList[]>
    page: number | string
    loading: boolean
    limit: number
    setPage: React.Dispatch<React.SetStateAction<string | number>>
    handleChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void
}

export const DefectTable: FC<DefectTableProps> = ({
    height,
    defectListTableData,
    page,
    limit,
    loading,
    setPage,
    handleChangeRowsPerPage,
}) => {
    return (
        <>
            <MyStyledDataGrid
                rows={defectListTableData.rows}
                columns={columns}
                height={height}
                loading={loading}
            />
            <MyTablePagination
                page={page}
                rowsPerPage={limit}
                pagesCount={defectListTableData.totalPageCount}
                rowsCount={defectListTableData.totalRowCount}
                setPage={setPage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}
