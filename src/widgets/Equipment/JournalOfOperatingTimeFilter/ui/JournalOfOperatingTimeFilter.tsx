import { Box } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { SearchEquipmentSelect } from '@entities/Equipment'
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

export const JournalOfOperatingTimeFilter: FC = () => {
    const journalOfOperatingTimeFilter = useStoreMap(
        $filter,
        (store) => store[FilterKeys.JOURNAL_OF_OPERATING_TIME] || {}
    )

    const formMethods =
        useForm<Partial<TFilter[FilterKeys.JOURNAL_OF_OPERATING_TIME]>>()

    const onSubmit = (
        data: Partial<TFilter[FilterKeys.JOURNAL_OF_OPERATING_TIME]>
    ) => {
        setFilter({ type: FilterKeys.JOURNAL_OF_OPERATING_TIME, value: data })
    }
    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    label="Фильтр"
                    active={
                        !!Object.keys(journalOfOperatingTimeFilter || {}).length
                    }
                    filterName={FilterKeys.JOURNAL_OF_OPERATING_TIME}
                    onSubmit={onSubmit}
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
                                            journalOfOperatingTimeFilter?.period
                                                ?.from
                                        ),
                                        to: formatStringToDate(
                                            journalOfOperatingTimeFilter?.period
                                                ?.to
                                        ),
                                    }}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                    rightContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchEquipmentSelect
                                    name="equipmentId"
                                    defaultValue={
                                        journalOfOperatingTimeFilter.equipmentId
                                    }
                                />
                                <SearchUserSelect
                                    name="userId"
                                    defaultValue={
                                        journalOfOperatingTimeFilter.userId
                                    }
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                ></Filter>
            </FormProvider>
        </Box>
    )
}
