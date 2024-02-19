import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button, Box } from '@mui/material'
import { uniqueId } from 'lodash'
import { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { clearEmptyFields } from '@shared/lib/helpers/clearEmptyFields'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { useModalContext } from '@shared/providers/ModalProvider'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'
import { createChecklistItemFx } from '../model/create'
import { CreateChecklistItemFormFields, formSchema } from '../model/formSchema'
import { OptionItem } from './OptionItem'

export const CreateChecklistItemForm: FC = () => {
    const formMethods = useForm<CreateChecklistItemFormFields>({
        resolver: zodResolver(formSchema),
    })

    const { closeModal } = useModalContext()

    const { id } = useDefaultParams()

    const [options, setOptions] = useState<string[]>([])

    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const handleAddOption = () => {
        setOptions((prev) => [...prev, uniqueId()])
    }

    const onSubmit = (data: CreateChecklistItemFormFields) => {
        const filteredData = {
            ...clearEmptyFields(data),
            checklistId: id,
        }
        createChecklistItemFx(filteredData).then(closeModal)
    }

    return (
        <Box sx={{ minWidth: '500px' }}>
            <FormProvider {...formMethods}>
                <form
                    id="createChecklistWorkForm"
                    onSubmit={handleSubmit(onSubmit)}
                ></form>

                <Stack spacing={2}>
                    <StandartTextField
                        label="Название"
                        name="name"
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
                            {options.map((option, i) => {
                                const nameError =
                                    !!errors?.answerOptions?.[i]?.name?.message

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
                        form="createChecklistWorkForm"
                        type="submit"
                        variant="contained"
                    >
                        Сохранить
                    </Button>
                </Stack>
            </FormProvider>
        </Box>
    )
}
