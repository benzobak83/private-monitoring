import { Box } from '@mui/material'
import { useStore, useStoreMap } from 'effector-react'
import { FC, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { $auth } from '@entities/Auth'
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

export const StartWorkFilter: FC = () => {
    const auth = useStore($auth)
    const startWorkFilter = useStoreMap(
        $filter,
        (store) => store.startWork || {}
    )

    const formMethods = useForm<Partial<TFilter[FilterKeys.START_WORK]>>()

    const onSubmit = (data: Partial<TFilter['startWork']>) => {
        setFilter({ type: FilterKeys.START_WORK, value: data })
    }

    useEffect(() => {
        if (!!Object.keys(startWorkFilter).length) return

        setFilter({
            type: FilterKeys.START_WORK,
            value: { subdivisionId: auth.user?.subdivision?.id },
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.user?.subdivision?.id])

    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    label="Фильтр"
                    filterName={FilterKeys.START_WORK}
                    active={!!Object.keys(startWorkFilter || {})?.length}
                    onSubmit={onSubmit}
                    leftContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchDirectionSelect
                                    name="directionId"
                                    defaultValue={startWorkFilter.directionId}
                                />
                                <SearchDirectionActivitySelect
                                    name="activityId"
                                    defaultValue={startWorkFilter.activityId}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                    rightContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchTerritorySelect
                                    name="territoryId"
                                    defaultValue={startWorkFilter.territoryId}
                                />
                                <SearchSubdivisionSelect
                                    label="Подразделение"
                                    name="subdivisionId"
                                    defaultValue={startWorkFilter.subdivisionId}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                />
            </FormProvider>
        </Box>
    )
}
