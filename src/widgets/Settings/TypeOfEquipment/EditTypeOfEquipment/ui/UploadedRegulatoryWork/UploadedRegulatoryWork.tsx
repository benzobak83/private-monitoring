import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { IconButton, List, ListItem, ListItemText } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import {
    $typeOfEquipment,
    useChecklistMaintenanceStore,
} from '@entities/Settings/TypesOfEquipment'
import { useModalContext } from '@shared/providers/ModalProvider'

export const UploadedRegulatoryWork: FC = () => {
    const typeOfEquipment = useStore($typeOfEquipment)
    const { openModal } = useModalContext()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [checklistMaintenance, setChecklistMaintenance] =
        useChecklistMaintenanceStore((store) => store)

    return (
        <>
            <List dense={true}>
                {typeOfEquipment.checklistMaintenance.map((checklist, i) => {
                    return (
                        <ListItem
                            key={checklist.id}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    color="error"
                                    data-modal-type="deleteChecklist"
                                    onClick={(e) => {
                                        setChecklistMaintenance(checklist)
                                        openModal(e)
                                    }}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={`${i + 1}. ${
                                    checklist.checklist.description
                                }`}
                            />
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}
