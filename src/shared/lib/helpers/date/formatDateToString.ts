import { format } from 'date-fns'
import { dateFormatView } from '../../consts/date'

export const formatDateToString = (
    date: Date | null,
    formatDateForView = dateFormatView
) => {
    if (!date) return

    return format(date, formatDateForView)
}
