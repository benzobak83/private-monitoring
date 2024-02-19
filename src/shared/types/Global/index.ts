export type TAnyFunc = (...args: any) => any
export type TVoidFunc = () => void

export type TIdWithName = {
    id: number
    name: string
}
export type TIdWithLabel = {
    id: number
    label: string
}
export type TRange<T = string> = {
    from: T
    to: T
}

export type TViewOrCreate = 'view' | 'create'
