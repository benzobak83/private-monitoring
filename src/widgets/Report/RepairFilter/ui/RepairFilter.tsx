import { Box } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { MethodsOfDefectSelect } from '@entities/Dict'
import {
    $filter,
    Filter,
    FilterKeys,
    TFilter,
    setFilter,
} from '@entities/Filter'
import { formatStringToDate } from '@shared/lib/helpers/date/formatStringToDate'
import { MyDateRangePicker } from '@shared/ui/FormFields/DateRangePicker/DateRangePicker'
import { DuetFieldsWrapper } from '@shared/ui/Wrappers/DuetFieldsWrapper/DuetFieldsWrapper'

export const RepairFilter: FC = () => {
    const repairReportFilter = useStoreMap(
        $filter,
        (store) => store.repairReport || {}
    )

    const formMethods = useForm<Partial<TFilter['repairReport']>>()

    const onSubmit = (data: Partial<TFilter['repairReport']>) => {
        setFilter({ type: FilterKeys.REPAIR_REPORT, value: data })
    }

    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    onSubmit={onSubmit}
                    filterName={FilterKeys.REPAIR_REPORT}
                    active={!!Object.keys(repairReportFilter || {}).length}
                    label="Фильтр"
                    leftContent={
                        <DuetFieldsWrapper>
                            <MyDateRangePicker
                                nameTo="period.to"
                                nameFrom="period.from"
                                labelFrom="Обнаружено от"
                                labelTo="Обнаружено до"
                                defaultValue={{
                                    from: formatStringToDate(
                                        repairReportFilter?.period?.from
                                    ),
                                    to: formatStringToDate(
                                        repairReportFilter?.period?.to
                                    ),
                                }}
                            />
                        </DuetFieldsWrapper>
                    }
                    rightContent={
                        <DuetFieldsWrapper>
                            <MethodsOfDefectSelect
                                name="method"
                                defaultValue={repairReportFilter.method}
                            />
                        </DuetFieldsWrapper>
                    }
                />
            </FormProvider>
        </Box>
    )
}
