import { useCallback, useState } from 'react'

/**необходимо тригеру прописать дататтрибут data-modal-type=*NAME_MODAL* */
export function useModal<T extends Record<string, boolean>>(initialModals: T) {
    const [modals, setModals] = useState<T>(initialModals)

    type TModalKey = keyof typeof modals

    const closeModal = useCallback(() => {
        Object.keys(modals).map((modal) => {
            if (modals[modal] === true) {
                setModals((prev) => ({ ...prev, [modal]: false }))
            }
        })
    }, [modals])

    const openModal = useCallback((e: React.MouseEvent) => {
        const target = e.currentTarget as HTMLButtonElement
        const type = target.dataset.modalType as TModalKey

        setModals((prev) => ({ ...prev, [type]: true }))
    }, [])

    const registerTrigger = useCallback(
        (type: TModalKey) => {
            return { 'data-modal-type': type, onClick: openModal }
        },
        [openModal]
    )

    const registerModal = useCallback(
        (modalName: TModalKey) => {
            return { handleClose: closeModal, open: modals[modalName] }
        },
        [modals, closeModal]
    )

    return {
        openModal,
        closeModal,
        modals,
        setModals,
        registerTrigger,
        registerModal,
    }
}
