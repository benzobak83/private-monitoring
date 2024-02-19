import { Box } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
    $filter,
    Filter,
    FilterKeys,
    setFilter,
    TFilter,
} from '@entities/Filter'
import { SearchSubdivisionSelect } from '@entities/Settings/Subdivision'
import { DuetFieldsWrapper } from '@shared/ui/Wrappers/DuetFieldsWrapper/DuetFieldsWrapper'

const regulatoryWorkId = 'objectFilterForm'

export const RegulatoryWorkFilter: FC = () => {
    const regulatoryWorkFilter = useStoreMap(
        $filter,
        (store) => store.regulatoryWork || {}
    )

    const formMethods = useForm<Partial<TFilter['regulatoryWork']>>()

    const onSubmit = (data: Partial<TFilter['regulatoryWork']>) => {
        setFilter({ type: FilterKeys.REGULATORY_WORK, value: data })
    }
    return (
        <Box mt={1} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    label="Фильтр"
                    filterName={FilterKeys.REGULATORY_WORK}
                    formName={regulatoryWorkId}
                    active={!!Object.keys(regulatoryWorkFilter || {}).length}
                    onSubmit={onSubmit}
                    leftContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchSubdivisionSelect
                                    label="Направление"
                                    name="directionId"
                                    defaultValue={
                                        regulatoryWorkFilter.directionId
                                    }
                                />
                                <SearchSubdivisionSelect
                                    label="Вид деятельности"
                                    name="activityId"
                                    defaultValue={
                                        regulatoryWorkFilter.activityId
                                    }
                                />
                            </DuetFieldsWrapper>
                            <DuetFieldsWrapper>
                                <SearchSubdivisionSelect
                                    label="Территория"
                                    name="territoryId"
                                    defaultValue={
                                        regulatoryWorkFilter.territoryId
                                    }
                                />
                                <SearchSubdivisionSelect
                                    label="Подразделение"
                                    name="subdivisionId"
                                    defaultValue={
                                        regulatoryWorkFilter.subdivisionId
                                    }
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                    rightContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchSubdivisionSelect
                                    label="Объект"
                                    name="objectId"
                                    defaultValue={regulatoryWorkFilter.objectId}
                                />
                                <SearchSubdivisionSelect
                                    label="Статус"
                                    name="status"
                                    defaultValue={regulatoryWorkFilter.status}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                />
            </FormProvider>
        </Box>
    )
}
