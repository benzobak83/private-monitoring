export const dowlandFile = (href: string) => {
    const link = document.createElement('a')
    link.href = href
    link.setAttribute('download', '')

    link.click()
    link.remove()
}
