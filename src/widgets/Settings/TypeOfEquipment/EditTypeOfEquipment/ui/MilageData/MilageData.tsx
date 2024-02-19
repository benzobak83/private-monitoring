import { Stack, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { $typeOfEquipment } from '@entities/Settings/TypesOfEquipment'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { EditTypeOfEquipmentFormFields } from '../../model/formSchema'
import { TNamespace } from '../../model/types'

type MilageDataProps = {
    namespace: TNamespace
    isRegulary: boolean
}

export const MilageData: FC<MilageDataProps> = ({ namespace, isRegulary }) => {
    const typeOfEquipment = useStore($typeOfEquipment)

    const { setValue } = useFormContext<EditTypeOfEquipmentFormFields>()

    const isChecklistMaintenance = namespace === 'checklistMaintenance'

    useEffect(() => {
        return () => {
            setValue(
                (namespace + '.mileage') as keyof EditTypeOfEquipmentFormFields,
                undefined
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Stack spacing={1}>
            {isRegulary && <Typography>Повторять каждыe</Typography>}
            <StandartTextField
                label="Пробег"
                name={namespace + '.mileage'}
                type="number"
                defaultValue={
                    isChecklistMaintenance
                        ? typeOfEquipment.checklistInspection?.[0]?.mileage
                        : ''
                }
            />
        </Stack>
    )
}
