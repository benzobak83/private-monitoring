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
import { SearchUserSelect } from '@entities/User'
import { DuetFieldsWrapper } from '@shared/ui/Wrappers/DuetFieldsWrapper/DuetFieldsWrapper'

export const StaffFilter: FC = () => {
    const staffFilter = useStoreMap($filter, (store) => store.staff)

    const formMethods = useForm<Partial<TFilter[FilterKeys.STAFF]>>()

    const onSubmit = (data: Partial<TFilter[FilterKeys.STAFF]>) => {
        setFilter({ type: FilterKeys.STAFF, value: data })
    }

    return (
        <Box mt={2} mb={2}>
            <FormProvider {...formMethods}>
                <Filter
                    label="Фильтр"
                    filterName={FilterKeys.STAFF}
                    active={!!Object.keys(staffFilter || {})?.length}
                    onSubmit={onSubmit}
                    leftContent={
                        <>
                            <DuetFieldsWrapper>
                                <SearchSubdivisionSelect
                                    name="subdivisionId"
                                    defaultValue={staffFilter?.subdivisionId}
                                />
                                <SearchUserSelect
                                    name="userId"
                                    defaultValue={staffFilter?.userId}
                                />
                            </DuetFieldsWrapper>
                        </>
                    }
                />
            </FormProvider>
        </Box>
    )
}
