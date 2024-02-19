import { Box } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
    $filter,
    Filter,
    FilterKeys,
    setFilter,
    TFilter,
} from '@entities/Filter'
import { SearchObjectSelect } from '@entities/Object'
import { formatStringToDate } from '@shared/lib/helpers/date/formatStringToDate'
import { MyDateRangePicker } from '@shared/ui/FormFields/DateRangePicker/DateRangePicker'
import { DuetFieldsWrapper } from '@shared/ui/Wrappers/DuetFieldsWrapper/DuetFieldsWrapper'

export const WorkFilter: FC = () => {
    const workFilter = useStoreMap($filter, (store) => store.work || {})

    const formMethods = useForm<Partial<TFilter[FilterKeys.WORK]>>()

    const onSubmit = (data: Partial<TFilter[FilterKeys.WORK]>) => {
        setFilter({ type: FilterKeys.WORK, value: data })
    }
    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    label="Фильтр"
                    filterName={FilterKeys.WORK}
                    active={!!Object.keys(workFilter || {})?.length}
                    onSubmit={onSubmit}
                    leftContent={
                        <>
                            <DuetFieldsWrapper>
                                <MyDateRangePicker
                                    nameFrom="period.from"
                                    nameTo="period.to"
                                    defaultValue={{
                                        from: formatStringToDate(
                                            workFilter?.period?.from
                                        ),
                                        to: formatStringToDate(
                                            workFilter?.period?.to
                                        ),
                                    }}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                    rightContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchObjectSelect
                                    name="objectId"
                                    defaultValue={workFilter.objectId}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                />
            </FormProvider>
        </Box>
    )
}
