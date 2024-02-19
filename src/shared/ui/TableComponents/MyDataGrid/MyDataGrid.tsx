/* eslint-disable react/display-name */
import { SxProps } from '@mui/material'
import { Box } from '@mui/material'
import { Theme, styled } from '@mui/material/styles'
import { DataGrid, DataGridProps, ruRU } from '@mui/x-data-grid'
import { memo, useMemo } from 'react'
import { CLEAR_ARRAY } from '../../../lib/consts/mock'
import { withMinWidth } from './lib/withMinWidth'

type MyDataGridProps = {
    sx?: SxProps<Theme>
    withBorder?: boolean
    height?: string
    rows: any[] | undefined | null
} & Omit<DataGridProps, 'rows'>

export const MyDataGrid = memo<MyDataGridProps>(
    ({ sx, height = null, ...props }) => {
        const { columns = [], rows = [], ...otherProps } = props

        const columnsWithMinWidth = useMemo(() => {
            return withMinWidth(columns)
        }, [columns])
        return (
            <Box>
                <DataGrid
                    sx={{
                        minWidth: '10px',
                        animation: '0.2s ease-out fadeIn',
                        minHeight: height,
                        height: !rows?.length && !height ? '200px' : height,
                        maxHeight: height,
                        '--unstable_DataGrid-radius': 'none',
                        ...sx,
                    }} //если не указать минвиз - варнинг
                    experimentalFeatures={{ columnGrouping: true }}
                    hideFooter
                    getRowHeight={() => 'auto'}
                    localeText={
                        ruRU.components.MuiDataGrid.defaultProps.localeText
                    }
                    {...otherProps}
                    rows={rows || CLEAR_ARRAY}
                    columns={columnsWithMinWidth}
                />
            </Box>
        )
    }
)

export const MyStyledDataGrid = styled(MyDataGrid)(() => ({
    '&  .MuiDataGrid-cell': {
        maxHeight: 'none !important',
        whiteSpace: 'unset !important',
    },
    '&  .MuiDataGrid-row': {
        minHeight: '52px !important',
    },
    '&  .MuiDataGrid-row:last-child': {},
}))

// const MyDataGridWithBorder = styled(MyDataGrid)(() => ({
//     '&  .MuiDataGrid-cell ': {
//         borderRight: '1px solid rgb(224, 224, 224)',
//     },
//     '& .MuiDataGrid-columnSeparator': {
//         display: 'none',
//     },
//     '& .MuiDataGrid-columnHeader': {
//         borderRight: '1px solid rgb(224, 224, 224)',
//         borderTop: '1px solid rgb(224, 224, 224)',
//     },
//     '& .MuiDataGrid-columnHeaderTitleContainer': {
//         border: 'none !important',
//     },
// }))
