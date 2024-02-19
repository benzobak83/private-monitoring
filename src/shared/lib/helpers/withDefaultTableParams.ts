import { TFilter } from '@entities/Filter'

export const withDefaultTableParams = (
    filter: Partial<
        TFilter[keyof TFilter]
    > | void = {} as TFilter[keyof TFilter]
) => {
    return {
        page: 1,
        limit: 200,
        sort: 'id',
        order: 'desc',
        filter: filter as TFilter[keyof TFilter],
    } as const
}
