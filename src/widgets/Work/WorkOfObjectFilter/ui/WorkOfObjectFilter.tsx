import { Box } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import {
    $filter,
    Filter,
    FilterKeys,
    setFilter,
    TFilter,
} from '@entities/Filter'
import { SearchUserSelect } from '@entities/User'
import { formatStringToDate } from '@shared/lib/helpers/date/formatStringToDate'
import { MyDateRangePicker } from '@shared/ui/FormFields/DateRangePicker/DateRangePicker'
import { DuetFieldsWrapper } from '@shared/ui/Wrappers/DuetFieldsWrapper/DuetFieldsWrapper'

export const WorkOfObjectFilter: FC = () => {
    const workOfObjectFilter = useStoreMap(
        $filter,
        (store) => store.workOfObject || {}
    )

    const formMethods = useForm<Partial<TFilter[FilterKeys.WORK_OF_OBJECT]>>()

    const onSubmit = (data: Partial<TFilter[FilterKeys.WORK_OF_OBJECT]>) => {
        setFilter({ type: FilterKeys.WORK_OF_OBJECT, value: data })
    }
    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    label="Фильтр"
                    active={!!Object.keys(workOfObjectFilter || {})?.length}
                    filterName={FilterKeys.WORK_OF_OBJECT}
                    onSubmit={onSubmit}
                    leftContent={
                        <>
                            <DuetFieldsWrapper>
                                <MyDateRangePicker
                                    nameTo="period.to"
                                    nameFrom="period.from"
                                    labelFrom="Начало"
                                    labelTo="Окончание"
                                    defaultValue={{
                                        from: formatStringToDate(
                                            workOfObjectFilter?.period?.from
                                        ),
                                        to: formatStringToDate(
                                            workOfObjectFilter?.period?.to
                                        ),
                                    }}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                    rightContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchUserSelect
                                    label="Сотрудник"
                                    name="userId"
                                    defaultValue={workOfObjectFilter.userId}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                ></Filter>
            </FormProvider>
        </Box>
    )
}
