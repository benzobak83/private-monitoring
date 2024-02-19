import { format, parse } from 'date-fns'
import { dateFormatBackend, dateFormatView } from '../../consts/date'

export const formatStringDate = (
    dateString: string | undefined,
    formatDateString = dateFormatBackend,
    formatDateForView = dateFormatView
) => {
    if (!dateString) return

    return format(
        parse(dateString, formatDateString, new Date()),
        formatDateForView
    )
}
