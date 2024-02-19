import { Stack, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { $dict } from '@entities/Dict'
import { $typeOfEquipment } from '@entities/Settings/TypesOfEquipment'
import { formatStringToDate } from '@shared/lib/helpers/date/formatStringToDate'
import { MyDatePicker } from '@shared/ui/FormFields/DatePicker/DatePicker'
import { DefaultSelect } from '@shared/ui/FormFields/Selects/DefaultSelect/DefaultSelect'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { EditTypeOfEquipmentFormFields } from '../../model/formSchema'
import { TNamespace } from '../../model/types'

type DateDataProps = {
    namespace: TNamespace
    isRegulary?: boolean
}

export const DateData: FC<DateDataProps> = ({ namespace, isRegulary }) => {
    const typeOfEquipment = useStore($typeOfEquipment)
    const dict = useStore($dict)

    const { setValue } = useFormContext<EditTypeOfEquipmentFormFields>()

    const isChecklistInspection = namespace === 'checklistInspection'

    useEffect(() => {
        return () => {
            setValue(
                (namespace + '.date') as keyof EditTypeOfEquipmentFormFields,
                undefined
            )
            setValue(
                (namespace +
                    '.repeated') as keyof EditTypeOfEquipmentFormFields,
                undefined
            )
            setValue(
                (namespace +
                    '.frequency') as keyof EditTypeOfEquipmentFormFields,
                undefined
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!isRegulary) {
        return (
            <MyDatePicker
                name={namespace + '.date'}
                label="Дата выполнения"
                defaultValue={
                    isChecklistInspection
                        ? formatStringToDate(
                              typeOfEquipment.checklistInspection?.[0]?.date
                          )
                        : null
                }
            />
        )
    }
    if (isRegulary) {
        return (
            <Stack spacing={1}>
                <Typography>Повторять каждыe</Typography>
                <Stack direction="row" spacing={1}>
                    <StandartTextField
                        name={namespace + '.repeated'}
                        type="number"
                        label="Количество"
                        defaultValue={
                            isChecklistInspection
                                ? typeOfEquipment.checklistInspection?.[0]
                                      ?.repeated
                                : undefined
                        }
                    />
                    <DefaultSelect
                        name={namespace + '.frequency'}
                        options={dict.checklist.typeFrequency}
                        getOptionLabel={(option) => option.name}
                        defaultValue={
                            isChecklistInspection
                                ? typeOfEquipment.checklistInspection?.[0]
                                      ?.frequency
                                : undefined
                        }
                        label="Измерение"
                    />
                </Stack>
            </Stack>
        )
    }
    return null
}
