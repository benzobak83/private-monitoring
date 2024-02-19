import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Box } from '@mui/material'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { completePlanningWork } from '@/features/Defect/PlanningWork/completePlanningWork/model/completePlanningWork'
import { RejectedBlock, usePlanningWorkContext } from '@entities/Defect'
import { SearchUserSelect } from '@entities/User'
import { dateFormatWithHoursAndMinutesView } from '@shared/lib/consts/date'
import { formatStringToDate } from '@shared/lib/helpers/date/formatStringToDate'
import { getEndOfTheCurrentDay } from '@shared/lib/helpers/date/getEndOfTheCurrentDay'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { MyDateRangePickerWithTime } from '@shared/ui/FormFields/DateRangePickerWithTime/DateRangePickerWithTime'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { PickMasterFormFields, formSchema } from './formSchema'

export const PickMasterForm = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const { planningWork } = usePlanningWorkContext()

    const { id } = useDefaultParams()

    const formMethods = useForm<PickMasterFormFields>({
        resolver: zodResolver(formSchema),
    })
    const {
        formState: { errors },
        handleSubmit,
    } = formMethods

    const onSubmit = (data: PickMasterFormFields) => {
        setLoading(true)
        completePlanningWork({ id, planningId: planningWork.id, data }).finally(
            () => {
                setLoading(false)
            }
        )
    }

    const dateValue =
        planningWork.dateStart && planningWork.dateEnd
            ? {
                  from: formatStringToDate(
                      planningWork.dateStart,
                      dateFormatWithHoursAndMinutesView
                  ),
                  to: formatStringToDate(
                      planningWork.dateEnd,
                      dateFormatWithHoursAndMinutesView
                  ),
              }
            : {
                  from: new Date(),
                  to: getEndOfTheCurrentDay(),
              }

    return (
        <Box>
            <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={1.5}>
                        <Stack spacing={1}>
                            <Stack direction={'row'} spacing={1.5}>
                                <MyDateRangePickerWithTime
                                    helperTextTo={errors?.dateStart?.message}
                                    helperTextFrom={errors?.dateEnd?.message}
                                    nameFrom="dateStart"
                                    nameTo="dateEnd"
                                    defaultValue={dateValue}
                                />
                            </Stack>
                        </Stack>

                        <Stack direction={'row'} spacing={2}>
                            <StandartTextField
                                label="Примерная стоимость"
                                name="sum"
                                type="number"
                                helperText={errors?.sum?.message}
                            />
                            <SearchUserSelect
                                name="workerId"
                                label="Мастер (производитель работ)"
                                defaultValue={planningWork.worker}
                                helperText={errors?.workerId?.message}
                            />
                        </Stack>
                        {planningWork?.agreement?.status === false && (
                            <RejectedBlock
                                fullName={planningWork?.agreement?.user?.name}
                                date={planningWork?.agreement?.date}
                                sum={planningWork?.agreement?.sum}
                                msg={planningWork?.agreement?.comment}
                            />
                        )}

                        <MyButton
                            variant="contained"
                            isLoading={loading}
                            type="submit"
                            sx={{ maxWidth: 'fit-content' }}
                        >
                            Сохранить
                        </MyButton>
                    </Stack>
                </form>
            </FormProvider>
        </Box>
    )
}
