export const temporarilyOverflow = (
    timeout: number = 1100,
    element: HTMLElement = document.querySelector('body') as HTMLElement
) => {
    element.style.overflow = 'hidden'

    setTimeout(() => (element.style.overflow = 'visible'), 1100)
}
