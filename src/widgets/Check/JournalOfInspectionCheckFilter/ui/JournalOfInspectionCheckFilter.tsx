import { Box } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { StateOfCheckSelect, TypeResultOfCheckSelect } from '@entities/Dict'
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

export const JournalOfInspectionCheckFilter: FC = () => {
    const journalOfInspectionCheckFilter = useStoreMap(
        $filter,
        (store) => store[FilterKeys.JOURNAL_OF_INSPECTION_CHECK] || {}
    )

    const formMethods =
        useForm<Partial<TFilter[FilterKeys.JOURNAL_OF_INSPECTION_CHECK]>>()

    const onSubmit = (
        data: Partial<TFilter[FilterKeys.JOURNAL_OF_INSPECTION_CHECK]>
    ) => {
        setFilter({ type: FilterKeys.JOURNAL_OF_INSPECTION_CHECK, value: data })
    }
    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    label="Фильтр"
                    active={
                        !!Object.keys(journalOfInspectionCheckFilter || {})
                            .length
                    }
                    filterName={FilterKeys.JOURNAL_OF_INSPECTION_CHECK}
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
                                            journalOfInspectionCheckFilter
                                                ?.period?.from
                                        ),
                                        to: formatStringToDate(
                                            journalOfInspectionCheckFilter
                                                ?.period?.to
                                        ),
                                    }}
                                />
                            </DuetFieldsWrapper>
                            <DuetFieldsWrapper>
                                <SearchObjectSelect
                                    name="objectId"
                                    defaultValue={
                                        journalOfInspectionCheckFilter.objectId
                                    }
                                />
                                <SearchEquipmentSelect
                                    name="equipmentId"
                                    defaultValue={
                                        journalOfInspectionCheckFilter.equipmentId
                                    }
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                    rightContent={
                        <>
                            <DuetFieldsWrapper>
                                <TypeResultOfCheckSelect
                                    name="resultId"
                                    defaultValue={
                                        journalOfInspectionCheckFilter.resultId
                                    }
                                />
                                <StateOfCheckSelect
                                    name="state"
                                    defaultValue={
                                        journalOfInspectionCheckFilter.state
                                    }
                                />
                            </DuetFieldsWrapper>
                            <DuetFieldsWrapper>
                                <SearchUserSelect
                                    name="userId"
                                    defaultValue={
                                        journalOfInspectionCheckFilter.userId
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
