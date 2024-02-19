export type TSortStore<T extends (Record<string, any> & { id: number })[]> = {
    rows: T
    initRows: T
    isStarting: boolean
    isLoading: boolean
    sortQuery: (sortedRows: number[], id: number) => Promise<unknown>
}

export type TUseSortType<T extends (Record<string, any> & { id: number })[]> = (
    selector: (store: TSortStore<T>) => TSortStore<T>
) => [TSortStore<T>, (value: Partial<TSortStore<T>>) => void]

export type TSort = 'up' | 'down'
