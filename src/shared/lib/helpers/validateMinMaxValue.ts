type TValue = {
    min: number
    max: number
}

export const validateMinMaxValue = (value: TValue) => {
    return (incomingVal: string | number) => {
        const incomingValToNumber = Number(incomingVal)

        if (incomingVal === '') return true

        if (!incomingValToNumber) return false

        return (
            incomingValToNumber >= value.min && incomingValToNumber <= value.max
        )
    }
}
