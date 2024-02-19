import { TSort } from '../model/types'

export const sortingRow = (
    row: Record<string, any> & { id: number },
    rows: (Record<string, any> & { id: number })[],
    type: TSort
) => {
    const currentRowIndex = rows.findIndex((item) => row.id === item.id)
    const isUpType = type === 'up'
    const isDownType = type === 'down'

    if (isUpType && currentRowIndex === 0) return
    if (isDownType && currentRowIndex === rows.length - 1) return

    const result = structuredClone(rows)

    if (isUpType) {
        const prevRow = rows[currentRowIndex - 1]

        result[currentRowIndex] = prevRow
        result[currentRowIndex - 1] = row
        return result
    }

    if (isDownType) {
        const nextRow = rows[currentRowIndex + 1]

        result[currentRowIndex] = nextRow
        result[currentRowIndex + 1] = row
    }

    return result
}
