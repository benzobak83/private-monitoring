import { parse } from 'date-fns'
import { dateFormatBackend } from '../../consts/date'

export const formatStringToDate = (
    dateString: string | undefined,
    formatDate = dateFormatBackend
) => {
    if (!dateString) return null
    return parse(dateString, formatDate, new Date())
}
