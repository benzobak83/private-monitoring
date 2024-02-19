import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { ResultOfCheckPicker } from '@entities/Check'
import {
    DefectPrioritySelect,
    DefectStageSelect,
    MethodsOfDefectSelect,
} from '@entities/Dict'
import {
    $filter,
    Filter,
    FilterKeys,
    setFilter,
    TFilter,
} from '@entities/Filter'
import { SearchObjectSelect } from '@entities/Object'
import { SearchSubdivisionSelect } from '@entities/Settings/Subdivision'
import { formatStringToDate } from '@shared/lib/helpers/date/formatStringToDate'
import { MyDateRangePicker } from '@shared/ui/FormFields/DateRangePicker/DateRangePicker'
import { MySwitch } from '@shared/ui/FormFields/MySwitch/MySwitch'
import { StandartTextField } from '@shared/ui/FormFields/StandartTextField/StandartTextField'
import { DuetFieldsWrapper } from '@shared/ui/Wrappers/DuetFieldsWrapper/DuetFieldsWrapper'

export const DefectFilter: FC = () => {
    const defectFilter = useStoreMap($filter, (store) => store.defect || {})

    const formMethods = useForm<Partial<TFilter[FilterKeys.DEFECT]>>()

    const onSubmit = (data: Partial<TFilter[FilterKeys.DEFECT]>) => {
        setFilter({ type: FilterKeys.DEFECT, value: data })
    }
    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    label="Фильтр"
                    active={!!Object.keys(defectFilter || {}).length}
                    filterName={FilterKeys.DEFECT}
                    onSubmit={onSubmit}
                    leftContent={
                        <>
                            <DuetFieldsWrapper>
                                <MyDateRangePicker
                                    nameTo="period.to"
                                    nameFrom="period.from"
                                    labelFrom="Обнаружено от"
                                    labelTo="Обнаружено до"
                                    defaultValue={{
                                        from: formatStringToDate(
                                            defectFilter?.period?.from
                                        ),
                                        to: formatStringToDate(
                                            defectFilter?.period?.to
                                        ),
                                    }}
                                />
                            </DuetFieldsWrapper>
                            <DuetFieldsWrapper>
                                <MethodsOfDefectSelect
                                    name="method"
                                    defaultValue={defectFilter.method}
                                />
                                <DefectStageSelect
                                    name="stage"
                                    defaultValue={defectFilter.stage}
                                />
                            </DuetFieldsWrapper>

                            <Stack
                                spacing={1}
                                mt={0.5}
                                direction="row"
                                alignItems="center"
                            >
                                <Typography variant="h6">
                                    Тип неисправности:
                                </Typography>
                                <ResultOfCheckPicker
                                    isDefect
                                    name="result"
                                    defaultValue={defectFilter.result}
                                />
                                <Divider flexItem orientation="vertical" />
                                <MySwitch
                                    label="На согласовании у ОПП"
                                    checked={defectFilter.asAgreed}
                                    name="asAgreed"
                                />
                            </Stack>
                        </>
                    }
                    rightContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchSubdivisionSelect
                                    name="subdivisionId"
                                    defaultValue={defectFilter.subdivisionId}
                                />
                                <SearchObjectSelect
                                    name="objectId"
                                    defaultValue={defectFilter.objectId}
                                />
                            </DuetFieldsWrapper>
                            <DuetFieldsWrapper>
                                <Tooltip title="Инв. номер, название">
                                    <StandartTextField
                                        label="Оборудование"
                                        name="equipment"
                                        defaultValue={defectFilter.equipment}
                                    />
                                </Tooltip>
                            </DuetFieldsWrapper>
                            <DuetFieldsWrapper>
                                <DefectPrioritySelect
                                    name="priority"
                                    defaultValue={defectFilter.priority}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                ></Filter>
            </FormProvider>
        </Box>
    )
}
