import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { queryParse } from '@shared/lib/helpers/queryString/queryParse'

export const useQueryFilter = () => {
    const [queryFilter, setQueryFilter] = useState({})

    const { search } = useLocation()

    useEffect(() => {
        const filterWithStringValue = queryParse(search)

        const validFilter = 'filter' in filterWithStringValue
        if (!validFilter) return
        if (typeof filterWithStringValue?.filter !== 'string') return

        setQueryFilter(queryParse(filterWithStringValue?.filter))
    }, [search])

    if (!search) return null

    return queryFilter
}
