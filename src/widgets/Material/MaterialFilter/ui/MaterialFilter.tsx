import { Box } from '@mui/material'
import { useStoreMap } from 'effector-react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
    $filter,
    Filter,
    FilterKeys,
    TFilter,
    setFilter,
} from '@entities/Filter'
import { SearchResponsibleUserSelect } from '@entities/User'
import { DuetFieldsWrapper } from '@shared/ui/Wrappers/DuetFieldsWrapper/DuetFieldsWrapper'

export const MaterialFilter: FC = () => {
    const materialsFilter = useStoreMap(
        $filter,
        (filter) => filter[FilterKeys.MATERIAL]
    )

    const formMethods = useForm<Partial<TFilter['material']>>()

    const onSubmit = (data: Partial<TFilter['material']>) => {
        setFilter({ type: FilterKeys.MATERIAL, value: data })
    }

    return (
        <Box>
            <FormProvider {...formMethods}>
                <Filter
                    onSubmit={onSubmit}
                    filterName={FilterKeys.MATERIAL}
                    label="Фильтр"
                    active={!!Object.keys(materialsFilter || {}).length}
                    leftContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchResponsibleUserSelect
                                    name="uuid"
                                    defaultValue={materialsFilter.uuid}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                ></Filter>
            </FormProvider>
        </Box>
    )
}
