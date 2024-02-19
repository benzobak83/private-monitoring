import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { Stack, IconButton } from '@mui/material'
import { FC, memo } from 'react'
import { useModalContext } from '../../../providers/ModalProvider'
import { TAnyFunc } from '../../../types/Global'

type TableActionsProps = {
    editModalType?: string
    deleteModalType?: string
    useStore: TAnyFunc
    selectorStore?: (store: any) => any
    entity: unknown
} & (
    | { editModalType: string; deleteModalType?: string }
    | { editModalType?: string; deleteModalType: string }
)

export const TableActions: FC<TableActionsProps> = memo(
    ({
        useStore,
        editModalType,
        selectorStore = () => {},
        deleteModalType,
        entity,
    }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [store, setEntity] = useStore(selectorStore)

        const { openModal } = useModalContext()

        const handleClick = (e: React.MouseEvent) => {
            openModal(e)
            setEntity(entity)
        }
        return (
            <Stack direction="row">
                {editModalType && (
                    <IconButton
                        onClick={handleClick}
                        data-modal-type={editModalType}
                    >
                        <EditIcon color="primary" />
                    </IconButton>
                )}
                {deleteModalType && (
                    <IconButton
                        onClick={handleClick}
                        data-modal-type={deleteModalType}
                    >
                        <DeleteForeverIcon color="error" />
                    </IconButton>
                )}
            </Stack>
        )
    }
)
