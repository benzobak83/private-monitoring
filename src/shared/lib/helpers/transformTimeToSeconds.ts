export const transformTimeToSeconds = (
    time: string,
    format: 'HH:MM' | 'HH:MM:SS'
) => {
    const splittingTime = time.split(':')

    if (format === 'HH:MM:SS') {
        return (
            +splittingTime[0] * 60 * 60 +
            +splittingTime[1] * 60 +
            +splittingTime[2]
        )
    }

    if (format === 'HH:MM') {
        return +splittingTime[0] * 60 * 60 + +splittingTime[1] * 60
    }

    return 0
}
