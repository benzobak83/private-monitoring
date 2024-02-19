import { Box } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EditTypeOfEquipmentForm } from '@widgets/Settings/TypeOfEquipment/EditTypeOfEquipment'
import { DeleteChecklistModal } from '@/features/Settings/TypeOfEquipment/deleteChecklist'
import {
    $typeOfEquipment,
    ChecklistMaintenanceProvider,
    getTypeOfEquipmentFx,
    resetTypeOfEquipment,
} from '@entities/Settings/TypesOfEquipment'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { useModal } from '@shared/lib/hooks/useModal'
import ModalProvider from '@shared/providers/ModalProvider'
import { WidgetLoading } from '@shared/ui/Loaders/WidgetLoading/WidgetLoading'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'

const initModals = {
    deleteChecklist: false,
}

const EditTypeOfEquipment: FC = () => {
    const typeOfEquipment = useStore($typeOfEquipment)
    const [loading, setLoading] = useState<boolean>(true)

    const modalMethods = useModal(initModals)

    const navigate = useNavigate()

    const { id } = useDefaultParams()

    useEffect(() => {
        getTypeOfEquipmentFx(id).finally(() => {
            setLoading(false)
        })
    }, [id])

    useEffect(() => {
        return () => resetTypeOfEquipment()
    }, [])

    if (loading) {
        return <WidgetLoading label="Загрузка типа оборудования..." />
    }

    if (!Object.keys(typeOfEquipment).length) {
        navigate(-1)
    }

    return (
        <ChecklistMaintenanceProvider>
            <ModalProvider {...modalMethods}>
                <Box>
                    <TitlePage back>
                        Редактирование типа оборудования -{' '}
                        {typeOfEquipment.name}
                    </TitlePage>
                    <Box sx={{ maxWidth: '1000px' }}>
                        <EditTypeOfEquipmentForm />
                    </Box>
                </Box>
                <DeleteChecklistModal />
            </ModalProvider>
        </ChecklistMaintenanceProvider>
    )
}
export default EditTypeOfEquipment
