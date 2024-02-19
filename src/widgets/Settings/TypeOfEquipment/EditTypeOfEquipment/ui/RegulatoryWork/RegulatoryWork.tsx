import { Box, Button, Divider, Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { SearchChecklistWorkSelect } from '@entities/Settings/ChecklistWork'
import {
    $typeOfEquipment,
    REGULARLY_CONTROL_OPTIONS,
    TYPE_CONTROL_OPTIONS,
} from '@entities/Settings/TypesOfEquipment'
import { getOptionLabelFromName } from '@shared/lib/helpers/muiSelectors'
import { StandartRadio } from '@shared/ui/FormFields/StandartRadio/StandartRadio'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { EditTypeOfEquipmentFormFields } from '../../model/formSchema'
import { TNamespace } from '../../model/types'
import { FillingDataBlock } from '../FillingDataBlock/FillingDataBlock'
import { UploadedRegulatoryWork } from '../UploadedRegulatoryWork/UploadedRegulatoryWork'

const NAMESPACE: TNamespace = 'checklistMaintenance'

type RegulatoryWorkProps = {
    addingWork: boolean
    setAddingWork: React.Dispatch<React.SetStateAction<boolean>>
}

export const RegulatoryWork: FC<RegulatoryWorkProps> = ({
    addingWork,
    setAddingWork,
}) => {
    const typeOfEquipment = useStore($typeOfEquipment)

    const { setValue } = useFormContext<EditTypeOfEquipmentFormFields>()

    useEffect(() => {
        if (addingWork) return
        setValue('checklistMaintenance', undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addingWork])
    return (
        <MyPaper
            title="Регламентные работы"
            sx={{ flexBasis: '50%' }}
            rightContent={
                <>
                    {!addingWork && (
                        <Button
                            color="success"
                            variant="contained"
                            onClick={() => setAddingWork(true)}
                        >
                            Добавить
                        </Button>
                    )}
                    {addingWork &&
                        !!typeOfEquipment.checklistMaintenance.length && (
                            <Button
                                color="error"
                                variant="contained"
                                onClick={() => setAddingWork(false)}
                            >
                                Отмена
                            </Button>
                        )}
                </>
            }
        >
            {!!typeOfEquipment.checklistMaintenance.length && (
                <Box mb={1}>
                    <UploadedRegulatoryWork />
                    <Divider />
                </Box>
            )}
            {addingWork && (
                <Stack spacing={2}>
                    <SearchChecklistWorkSelect
                        name={NAMESPACE + '.checklistId'}
                    />
                    <StandartRadio
                        name={`${NAMESPACE}.isRegular`}
                        options={REGULARLY_CONTROL_OPTIONS}
                        type="boolean"
                        getOptionValue={(option) => option.value}
                        row
                        label="Метод проверки"
                    />
                    <StandartRadio
                        name={`${NAMESPACE}.typeControl`}
                        options={TYPE_CONTROL_OPTIONS}
                        type="number"
                        getOptionLabel={getOptionLabelFromName}
                        getOptionValue={(option) => Number(option.id)}
                        row
                        label="Тип проверки"
                    />
                    <FillingDataBlock namespace={NAMESPACE} />
                </Stack>
            )}
        </MyPaper>
    )
}
