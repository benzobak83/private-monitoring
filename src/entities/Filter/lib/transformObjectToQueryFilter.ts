import { queryStringify } from '@shared/lib/helpers/queryString/queryStringify'
import { TFilter } from '../model/types/filter.types'

export const transformObjectToQueryFilter = (
    filter: Partial<TFilter[keyof TFilter]>
) => {
    return '?' + queryStringify({ filter: queryStringify(filter) })
}
