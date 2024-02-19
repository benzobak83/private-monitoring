export const getEndOfTheCurrentDay = () => {
    const date = new Date()
    date.setHours(23, 59, 59, 999)

    return date
}
