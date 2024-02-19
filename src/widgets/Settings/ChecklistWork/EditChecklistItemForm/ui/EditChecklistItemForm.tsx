import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button, Box } from '@mui/material'
import { uniqueId } from 'lodash'
import { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { deleteWorkAnswerOption } from '@/features/Settings/ChecklistWork/deleteAnswerOption'
import {
    EditChecklistItemFormFields,
    editChecklistItemFormSchema,
    editChecklistItemFx,
} from '@features/Settings/ChecklistWork/editItem'
import { useChecklistWorkItemStore } from '@entities/Settings/ChecklistWork'
import { clearEmptyFields } from '@shared/lib/helpers/clearEmptyFields'
import { useModalContext } from '@shared/providers/ModalProvider'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { OptionItem } from './OptionItem'
import { UploadedOptions } from './UploadedOptions'

export const EditChecklistItemForm: FC = () => {
    const formMethods = useForm<EditChecklistItemFormFields>({
        resolver: zodResolver(editChecklistItemFormSchema),
    })

    const [answerOptionsIdsForDelete, setAnswerOptionsIdsForDelete] = useState<
        number[]
    >([])

    const [loading, setLoading] = useState<boolean>(false)

    const [checklistItem] = useChecklistWorkItemStore((store) => store)

    const { closeModal } = useModalContext()

    const [options, setOptions] = useState<string[]>([])

    const {
        handleSubmit,

        formState: { errors },
    } = formMethods

    const handleAddOption = () => {
        setOptions((prev) => [...prev, uniqueId()])
    }

    const onSubmit = (data: EditChecklistItemFormFields) => {
        setLoading(true)
        Promise.all(
            answerOptionsIdsForDelete.map((id) => {
                return deleteWorkAnswerOption(id)
            })
        )
            .then(() => {
                return editChecklistItemFx({
                    data: clearEmptyFields(data),
                    id: checklistItem.id,
                })
            })
            .then(closeModal)
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <LoaderWrapper loading={loading}>
            <Box sx={{ minWidth: '500px' }}>
                <FormProvider {...formMethods}>
                    <form
                        id="editChecklistWorkForm"
                        onSubmit={handleSubmit(onSubmit)}
                    ></form>

                    <Stack spacing={2}>
                        <StandartTextField
                            label="Название"
                            name="name"
                            defaultValue={checklistItem.name}
                            helperText={errors.name?.message}
                        />
                        <MyPaper
                            title="Варианты ответа"
                            rightContent={
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleAddOption}
                                >
                                    Добавить
                                </Button>
                            }
                        >
                            <Stack spacing={1}>
                                <UploadedOptions
                                    setAnswerOptionsIdsForDelete={
                                        setAnswerOptionsIdsForDelete
                                    }
                                />
                                {options.map((option, i) => {
                                    const nameError =
                                        !!errors?.answerOptions?.[i]?.name
                                            ?.message

                                    return (
                                        <OptionItem
                                            key={option}
                                            id={option}
                                            setOptions={setOptions}
                                            error={nameError}
                                            index={i}
                                            name="answerOptions"
                                        />
                                    )
                                })}
                            </Stack>
                        </MyPaper>

                        <Button
                            form="editChecklistWorkForm"
                            type="submit"
                            variant="contained"
                        >
                            Сохранить
                        </Button>
                    </Stack>
                </FormProvider>
            </Box>
        </LoaderWrapper>
    )
}
