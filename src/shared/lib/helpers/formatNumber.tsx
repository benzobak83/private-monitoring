export const formatNumber = (number: number, isRub = true) => {
    const valueForFormat = Number(number)
    if (!valueForFormat) return 0

    return new Intl.NumberFormat('ru-RU').format(number) + (isRub ? ' ₽' : '')
}
