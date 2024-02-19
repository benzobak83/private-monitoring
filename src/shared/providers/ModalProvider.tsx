import { once } from 'lodash'
import { ReactNode, useMemo } from 'react'
import { createContext, useContext } from 'react'

export type TModalMethods = {
    openModal: (e: React.MouseEvent) => void
    closeModal: () => void
    modals: Record<string, boolean>
    setModals: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
    registerTrigger: (type: string) => {
        'data-modal-type': string
        onClick: (e: React.MouseEvent) => void
    }
    registerModal: (modalName: string) => {
        handleClose: () => void
        open: boolean
    }
}

export type ModalProviderProps<T extends Record<string, any>> = {
    [K in keyof T]: T[K]
} & {
    children: ReactNode
}

export type TModalContextValue<T extends Record<string, any>> = Omit<
    ModalProviderProps<T>,
    'children'
>

export const createModalContext = once(<T extends Record<string, any>>() =>
    createContext<TModalContextValue<T>>({} as TModalContextValue<T>)
)

export const useModalContext = <T,>() => {
    type TModalContext = T extends TModalMethods ? T : TModalMethods

    return useContext(createModalContext<TModalContext>())
}

const ModalProvider = <T extends Record<string, any>>({
    children,
    ...modalMethods
}: ModalProviderProps<T>) => {
    if (!Object.keys(modalMethods).length) {
        throw Error('need modalMethods for ModalProvider')
    }

    const ModalContext = createModalContext<T>()

    const value = useMemo(
        () => ({
            ...modalMethods,
            context: ModalContext,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [modalMethods]
    )

    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    )
}

export default ModalProvider
