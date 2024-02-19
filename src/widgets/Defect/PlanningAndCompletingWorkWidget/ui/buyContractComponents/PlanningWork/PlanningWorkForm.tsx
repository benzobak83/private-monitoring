import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Box } from '@mui/material'
import { useStore } from 'effector-react'
import { FormProvider, useForm } from 'react-hook-form'
import { completePlanningWork } from '@/features/Defect/PlanningWork/completePlanningWork/model/completePlanningWork'
import { RejectedBlock, usePlanningWorkContext } from '@entities/Defect'
import { dateFormatWithHoursAndMinutesView } from '@shared/lib/consts/date'
import { formatStringToDate } from '@shared/lib/helpers/date/formatStringToDate'
import { getEndOfTheCurrentDay } from '@shared/lib/helpers/date/getEndOfTheCurrentDay'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { MyDateRangePickerWithTime } from '@shared/ui/FormFields/DateRangePickerWithTime/DateRangePickerWithTime'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { PlanningWorkFormFields, formSchema } from './formSchema'

export const PlanningWorkForm = () => {
    const completePlanningWorkIsLoading = useStore(completePlanningWork.pending)

    const { planningWork } = usePlanningWorkContext()

    const { id } = useDefaultParams()
    const formMethods = useForm<PlanningWorkFormFields>({
        resolver: zodResolver(formSchema),
    })
    const {
        formState: { errors },
        handleSubmit,
    } = formMethods

    const onSubmit = (data: PlanningWorkFormFields) => {
        completePlanningWork({ id, planningId: planningWork.id, data })
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
                        <Stack spacing={1.5}>
                            <MyDateRangePickerWithTime
                                nameFrom="dateStart"
                                nameTo="dateEnd"
                                defaultValue={dateValue}
                                helperTextTo={errors.dateStart?.message}
                                helperTextFrom={errors.dateEnd?.message}
                            />
                            <StandartTextField
                                label="Примерная стоимость"
                                name="sum"
                                type="number"
                                helperText={errors?.sum?.message}
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
                            isLoading={completePlanningWorkIsLoading}
                            variant="contained"
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
