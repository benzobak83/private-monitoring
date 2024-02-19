import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { completePlanningWork } from '@/features/Defect/PlanningWork/completePlanningWork/model/completePlanningWork'
import { usePlanningWorkContext } from '@entities/Defect/model/providers/PlanningWorkProvider'
import { getEndOfTheCurrentDay } from '@shared/lib/helpers/date/getEndOfTheCurrentDay'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { MyDateRangePickerWithTime } from '@shared/ui/FormFields/DateRangePickerWithTime/DateRangePickerWithTime'
import { ViewFieldPrimitiveValue } from '@shared/ui/FormFields/ViewFieldPrimitiveValue/ViewFieldPrimitiveValue'
import { MyButton } from '@shared/ui/MyButton/MyButton'
import { PlanningWorkFormFields, formSchema } from './formSchema'

export const PlanningForm: FC = () => {
    const completePlanningWorkIsLoading = useStore(completePlanningWork.pending)

    const { planningWork } = usePlanningWorkContext()

    const { id } = useDefaultParams()

    const formMethods = useForm<PlanningWorkFormFields>({
        resolver: zodResolver(formSchema),
    })

    const {
        handleSubmit,
        formState: { errors },
    } = formMethods

    const onSubmit = (data: PlanningWorkFormFields) => {
        completePlanningWork({ id, planningId: planningWork.id, data })
    }
    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={1}>
                    <ViewFieldPrimitiveValue
                        label="На принятие решения (3ч) осталось"
                        value={planningWork.timeToMakeDecision}
                        valueColor="red"
                    />

                    <Typography variant="h6">Планирование работ:</Typography>
                    <MyDateRangePickerWithTime
                        nameFrom="dateStart"
                        nameTo="dateEnd"
                        defaultValue={{
                            from: new Date(),
                            to: getEndOfTheCurrentDay(),
                        }}
                        helperTextTo={errors.dateStart?.message}
                        helperTextFrom={errors.dateEnd?.message}
                    />
                </Stack>
                <MyButton
                    isLoading={completePlanningWorkIsLoading}
                    type="submit"
                    variant="contained"
                    sx={{ maxWidth: 'fit-content', mt: 2 }}
                >
                    Сохранить
                </MyButton>
            </form>
        </FormProvider>
    )
}
