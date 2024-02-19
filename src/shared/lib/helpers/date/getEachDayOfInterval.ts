import { eachDayOfInterval } from 'date-fns'
import { formatDateToString } from './formatDateToString'

export const getEachDayOfInterval = (start: Date, end: Date) => {
    const arrayOfDates = eachDayOfInterval({
        start,
        end,
    })

    const arrayOfDays = arrayOfDates.map((date) => formatDateToString(date))
}
