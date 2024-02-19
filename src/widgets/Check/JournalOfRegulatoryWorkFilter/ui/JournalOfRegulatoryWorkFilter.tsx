import { Box } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { StateOfCheckSelect } from '@entities/Dict'
import { SearchEquipmentSelect } from '@entities/Equipment'
import {
    $filter,
    Filter,
    FilterKeys,
    setFilter,
    TFilter,
} from '@entities/Filter'
import { SearchObjectSelect } from '@entities/Object'
import { SearchUserSelect } from '@entities/User'
import { formatStringToDate } from '@shared/lib/helpers/date/formatStringToDate'
import { MyDateRangePicker } from '@shared/ui/FormFields/DateRangePicker/DateRangePicker'
import { DuetFieldsWrapper } from '@shared/ui/Wrappers/DuetFieldsWrapper/DuetFieldsWrapper'

export const JournalOfRegulatoryWorkFilter: FC = () => {
    const journalOfRegulatoryWorkFilter = useStoreMap(
        $filter,
        (store) => store[FilterKeys.JOURNAL_OF_REGULATORY_WORK] || {}
    )

    const formMethods =
        useForm<Partial<TFilter[FilterKeys.JOURNAL_OF_REGULATORY_WORK]>>()

    const onSubmit = (
        data: Partial<TFilter[FilterKeys.JOURNAL_OF_REGULATORY_WORK]>
    ) => {
        setFilter({ type: FilterKeys.JOURNAL_OF_REGULATORY_WORK, value: data })
    }
    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    label="Фильтр"
                    active={
                        !!Object.keys(journalOfRegulatoryWorkFilter || {})
                            .length
                    }
                    filterName={FilterKeys.JOURNAL_OF_REGULATORY_WORK}
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
                                            journalOfRegulatoryWorkFilter
                                                ?.period?.from
                                        ),
                                        to: formatStringToDate(
                                            journalOfRegulatoryWorkFilter
                                                ?.period?.to
                                        ),
                                    }}
                                />
                            </DuetFieldsWrapper>
                            <DuetFieldsWrapper>
                                <SearchObjectSelect
                                    name="objectId"
                                    defaultValue={
                                        journalOfRegulatoryWorkFilter.objectId
                                    }
                                />
                                <SearchEquipmentSelect
                                    name="equipmentId"
                                    defaultValue={
                                        journalOfRegulatoryWorkFilter.equipmentId
                                    }
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                    rightContent={
                        <>
                            <DuetFieldsWrapper>
                                <StateOfCheckSelect
                                    name="state"
                                    defaultValue={
                                        journalOfRegulatoryWorkFilter.state
                                    }
                                />
                                <SearchUserSelect
                                    name="userId"
                                    defaultValue={
                                        journalOfRegulatoryWorkFilter.userId
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
