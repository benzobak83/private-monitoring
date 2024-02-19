import { Stack } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { UpdateDataIn1CFullChangedBtn } from '@/features/Settings/DataIn1c/updateDataIn1CFullChanged'
import { UpdateDataIn1cOnlyChangedBtn } from '@/features/Settings/DataIn1c/updateDataIn1COnlyChanged'
import { TUpdateData1C } from '@entities/Settings/UpdateDataIn1C'
import { ID_PARAMS } from '@shared/lib/consts/table'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'

export const columns: GridColDef<TUpdateData1C, any, any>[] = [
    {
        field: 'description',
        headerName: 'Блоки данных',
        ...ID_PARAMS,
    },
    {
        field: 'dateUpdate',
        headerName: 'Обновить только измененные',
        flex: 1,
        renderCell: ({ row }) => {
            return (
                <Stack>
                    <UpdateDataIn1cOnlyChangedBtn service={row.name} />
                    <ViewFieldPrimitiveValue
                        label="выполнялось"
                        value={row.dateUpdate}
                    />
                </Stack>
            )
        },
    },
    {
        field: 'dateUpload',
        headerName: 'Обновить полностью',
        flex: 1,
        renderCell: ({ row }) => {
            return (
                <Stack>
                    <UpdateDataIn1CFullChangedBtn service={row.name} />
                    <ViewFieldPrimitiveValue
                        label="выполнялось"
                        value={row.dateUpload}
                    />
                </Stack>
            )
        },
    },
]
