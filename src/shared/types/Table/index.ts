export type TTableData<DataRows> = {
    page: number
    rows: DataRows
    totalPageCount: number
    totalRowCount: number
    order: string
    sort: string
}

export type TTableRequest<FilterData = unknown> = {
    page: number | string
    limit: number | string
    sort?: string
    order?: string
    filter?: FilterData
}
