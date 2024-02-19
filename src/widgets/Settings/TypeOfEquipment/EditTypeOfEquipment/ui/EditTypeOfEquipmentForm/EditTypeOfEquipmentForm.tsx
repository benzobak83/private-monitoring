import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button, Divider } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { editTypeOfEquipmentFx } from '@features/Settings/TypeOfEquipment/edit'
import {
    $typeOfEquipment,
    reloadTypeOfEquipmentItem,
} from '@entities/Settings/TypesOfEquipment'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import {
    EditTypeOfEquipmentFormFields,
    formSchema,
} from '../../model/formSchema'
import { InspectionState } from '../InspectionState/InspectionState'
import { RegulatoryWork } from '../RegulatoryWork/RegulatoryWork'

export const EditTypeOfEquipmentForm: FC = () => {
    const typeOfEquipment = useStore($typeOfEquipment)
    const editTypeOfEquipmentFxIsPending = useStore(
        editTypeOfEquipmentFx.pending
    )

    const { id } = useDefaultParams()

    const [addingWork, setAddingWork] = useState<boolean>(
        !typeOfEquipment.checklistMaintenance.length
    )

    const formMethods = useForm<EditTypeOfEquipmentFormFields>({
        resolver: zodResolver(formSchema),
    })

    const { handleSubmit } = formMethods

    const onSubmit = (data: EditTypeOfEquipmentFormFields) => {
        const filteredData = {
            ...data,
            checklistInspection: data.checklistInspection?.checklistId
                ? data.checklistInspection
                : undefined,
            checklistMaintenance: data.checklistMaintenance?.checklistId
                ? data.checklistMaintenance
                : undefined,
        }
        editTypeOfEquipmentFx({ data: filteredData, id }).then(() => {
            reloadTypeOfEquipmentItem()
            setAddingWork(false)
        })
    }

    return (
        <LoaderWrapper loading={editTypeOfEquipmentFxIsPending}>
            <FormProvider {...formMethods}>
                <form
                    id="editTypeOfEquipmentForm"
                    onSubmit={handleSubmit(onSubmit)}
                ></form>
                <MyPaper>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={1.5}>
                            <InspectionState />
                            <Divider orientation="vertical" flexItem light />
                            <RegulatoryWork
                                addingWork={addingWork}
                                setAddingWork={setAddingWork}
                            />
                        </Stack>

                        <Button
                            form="editTypeOfEquipmentForm"
                            type="submit"
                            variant="contained"
                        >
                            Сохранить
                        </Button>
                    </Stack>
                </MyPaper>
            </FormProvider>
        </LoaderWrapper>
    )
}
