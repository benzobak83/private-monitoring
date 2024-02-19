import { Box } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
    SearchDirectionActivitySelect,
    SearchDirectionSelect,
} from '@entities/Direction'
import {
    $filter,
    Filter,
    FilterKeys,
    setFilter,
    TFilter,
} from '@entities/Filter'
import { SearchSubdivisionSelect } from '@entities/Settings/Subdivision'
import { SearchTerritorySelect } from '@entities/Territory'
import { DuetFieldsWrapper } from '@shared/ui/Wrappers/DuetFieldsWrapper/DuetFieldsWrapper'

export const ObjectFilter: FC = () => {
    const objectFilter = useStoreMap($filter, (store) => store.object || {})

    const formMethods = useForm<Partial<TFilter[FilterKeys.OBJECT]>>()

    const onSubmit = (data: Partial<TFilter[FilterKeys.OBJECT]>) => {
        setFilter({ type: FilterKeys.OBJECT, value: data })
    }

    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    label="Фильтр"
                    active={!!Object.keys(objectFilter || {}).length}
                    filterName={FilterKeys.OBJECT}
                    onSubmit={onSubmit}
                    leftContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchDirectionSelect
                                    name="directionId"
                                    defaultValue={objectFilter.directionId}
                                />
                                <SearchDirectionActivitySelect
                                    name="activityId"
                                    defaultValue={objectFilter.activityId}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                    rightContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchTerritorySelect
                                    name="territoryId"
                                    defaultValue={objectFilter.territoryId}
                                />
                                <SearchSubdivisionSelect
                                    name="subdivisionId"
                                    defaultValue={objectFilter.subdivisionId}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                />
            </FormProvider>
        </Box>
    )
}
