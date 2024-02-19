import { Box, Stack, Typography } from '@mui/material'
import { useStore, useStoreMap } from 'effector-react'
import { FC, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { ResultOfCheckPicker } from '@entities/Check'
import {
    SearchDirectionActivitySelect,
    SearchDirectionSelect,
} from '@entities/Direction'
import {
    $equipmentStatistics,
    SearchTypesOfEquipmentSelect,
    getEquipmentStatisticsFx,
} from '@entities/Equipment'
import {
    $filter,
    Filter,
    FilterKeys,
    setFilter,
    TFilter,
} from '@entities/Filter'
import { SearchObjectSelect } from '@entities/Object'
import { SearchSubdivisionSelect } from '@entities/Settings/Subdivision'
import { SearchTerritorySelect } from '@entities/Territory'
import { SearchUserSelect } from '@entities/User'
import { DuetFieldsWrapper } from '@shared/ui/Wrappers/DuetFieldsWrapper/DuetFieldsWrapper'

export const EquipmentFilter: FC = () => {
    const equipmentStatistics = useStore($equipmentStatistics)
    const equipmentFilter = useStoreMap(
        $filter,
        (store) => store.equipment || {}
    )

    const formMethods = useForm<Partial<TFilter[FilterKeys.EQUIPMENT]>>()

    const onSubmit = (data: Partial<TFilter[FilterKeys.EQUIPMENT]>) => {
        setFilter({ type: FilterKeys.EQUIPMENT, value: data })
    }

    useEffect(() => {
        getEquipmentStatisticsFx()
    }, [])

    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    label="Фильтр"
                    active={!!Object.keys(equipmentFilter || {}).length}
                    filterName={FilterKeys.EQUIPMENT}
                    onSubmit={onSubmit}
                    leftContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchObjectSelect
                                    name="objectId"
                                    defaultValue={equipmentFilter.objectId}
                                />
                                <SearchUserSelect
                                    label="Ответственный"
                                    name="userId"
                                    defaultValue={equipmentFilter.userId}
                                />
                            </DuetFieldsWrapper>
                            <DuetFieldsWrapper>
                                <SearchDirectionSelect
                                    name="directionId"
                                    defaultValue={equipmentFilter.directionId}
                                />
                                <SearchDirectionActivitySelect
                                    name="activityId"
                                    defaultValue={equipmentFilter.activityId}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                    rightContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchTerritorySelect
                                    name="territoryId"
                                    defaultValue={equipmentFilter.territoryId}
                                />
                                <SearchSubdivisionSelect
                                    name="subdivisionId"
                                    label="Подразделение"
                                    defaultValue={equipmentFilter.subdivisionId}
                                />
                            </DuetFieldsWrapper>
                            <DuetFieldsWrapper>
                                <SearchTypesOfEquipmentSelect
                                    name="typeEquipmentId"
                                    defaultValue={
                                        equipmentFilter.typeEquipmentId
                                    }
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                >
                    <Stack
                        spacing={1}
                        mt={0.5}
                        direction="row"
                        alignItems="center"
                    >
                        <Typography variant="h6">
                            Результат проверки:
                        </Typography>
                        <ResultOfCheckPicker
                            name="result"
                            defaultValue={equipmentFilter.result}
                            equipmentStatistics={equipmentStatistics}
                        />
                    </Stack>
                </Filter>
            </FormProvider>
        </Box>
    )
}
