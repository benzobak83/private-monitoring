import { Box } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import {
    EditSubdivisionForm,
    editSubdivisionFx,
} from '@widgets/Settings/Subdivision/EditSubdivisionForm'
import { SubdivisionTable } from '@widgets/Settings/Subdivision/SubdivisionTable'
import { SubdivisionProvider } from '@entities/Settings/Subdivision'
import { useModal } from '@shared/lib/hooks/useModal'
import ModalProvider from '@shared/providers/ModalProvider'
import { MyModal } from '@shared/ui/Modals/MyModal/MyModal'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'

const initModals = {
    editSubdivisionModal: false,
}

const Subdivision: FC = () => {
    const editSubdivisionFxIsPending = useStore(editSubdivisionFx.pending)

    const modalMethods = useModal(initModals)
    const { registerModal } = modalMethods
    return (
        <Box>
            <TitlePage back>Подразделения</TitlePage>
            <SubdivisionProvider>
                <ModalProvider {...modalMethods}>
                    <SubdivisionTable />
                    <MyModal
                        {...registerModal('editSubdivisionModal')}
                        title="Редактироваие подразделения"
                        loading={editSubdivisionFxIsPending}
                    >
                        <EditSubdivisionForm />
                    </MyModal>
                </ModalProvider>
            </SubdivisionProvider>
        </Box>
    )
}

export default Subdivision
