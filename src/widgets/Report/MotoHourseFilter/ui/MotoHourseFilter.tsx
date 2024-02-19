import { Box } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import {
    $filter,
    Filter,
    FilterKeys,
    TFilter,
    setFilter,
} from '@entities/Filter'
import { SearchUserSelect } from '@entities/User'
import { formatStringToDate } from '@shared/lib/helpers/date/formatStringToDate'
import { MyDateRangePicker } from '@shared/ui/FormFields/DateRangePicker/DateRangePicker'
import { DuetFieldsWrapper } from '@shared/ui/Wrappers/DuetFieldsWrapper/DuetFieldsWrapper'

export const MotoHourseFilter: FC = () => {
    const motoHourseFilter = useStoreMap(
        $filter,
        (store) => store.motohourseReport || {}
    )

    const formMethods = useForm<Partial<TFilter['motohourseReport']>>()

    const onSubmit = (data: Partial<TFilter['motohourseReport']>) => {
        setFilter({ type: FilterKeys.MOTOHOURSE_REPORT, value: data })
    }

    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    onSubmit={onSubmit}
                    label="Фильтр"
                    filterName={FilterKeys.MOTOHOURSE_REPORT}
                    active={!!Object.keys(motoHourseFilter || {}).length}
                    leftContent={
                        <>
                            <DuetFieldsWrapper>
                                <MyDateRangePicker
                                    nameTo="period.to"
                                    nameFrom="period.from"
                                    labelFrom="Дата проведения от"
                                    labelTo="Дата проведения до"
                                    defaultValue={{
                                        from: formatStringToDate(
                                            motoHourseFilter?.period?.from
                                        ),
                                        to: formatStringToDate(
                                            motoHourseFilter?.period?.to
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
                                    name="userId"
                                    defaultValue={motoHourseFilter.userId}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                ></Filter>
            </FormProvider>
        </Box>
    )
}
