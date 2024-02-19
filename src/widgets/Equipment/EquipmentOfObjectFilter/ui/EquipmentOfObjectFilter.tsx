import { Box, Stack, Typography } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { ResultOfCheckPicker } from '@entities/Check'
import { SearchTypesOfEquipmentSelect } from '@entities/Equipment'
import {
    $filter,
    Filter,
    FilterKeys,
    setFilter,
    TFilter,
} from '@entities/Filter'
import { SearchTerritorySelect } from '@entities/Territory'
import { DuetFieldsWrapper } from '@shared/ui/Wrappers/DuetFieldsWrapper/DuetFieldsWrapper'

export const EquipmentOfObjectFilter: FC = () => {
    const equipmentOfObjectFilter = useStoreMap(
        $filter,
        (store) => store.equipmentOfObject || {}
    )

    const formMethods =
        useForm<Partial<TFilter[FilterKeys.EQUIPMENT_OF_OBJECT]>>()

    const onSubmit = (
        data: Partial<TFilter[FilterKeys.EQUIPMENT_OF_OBJECT]>
    ) => {
        setFilter({ type: FilterKeys.EQUIPMENT_OF_OBJECT, value: data })
    }
    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    label="Фильтр"
                    filterName={FilterKeys.EQUIPMENT_OF_OBJECT}
                    active={!!Object.keys(equipmentOfObjectFilter || {}).length}
                    onSubmit={onSubmit}
                    leftContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchTypesOfEquipmentSelect
                                    defaultValue={
                                        equipmentOfObjectFilter.typeEquipmentId
                                    }
                                    name="typeEquipmentId"
                                />
                                <SearchTerritorySelect
                                    defaultValue={
                                        equipmentOfObjectFilter.territoryId
                                    }
                                    name="territoryId"
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                    rightContent={
                        <>
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
                                    defaultValue={
                                        equipmentOfObjectFilter.result
                                    }
                                />
                            </Stack>
                        </>
                    }
                ></Filter>
            </FormProvider>
        </Box>
    )
}
