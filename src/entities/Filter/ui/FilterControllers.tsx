import { Button, Stack } from '@mui/material'
import { FC } from 'react'
import { TVoidFunc } from '@shared/types/Global'
import { resetFilter } from '../model/filter'
import { FilterKeys } from '../model/types/filter.types'

type FilterControllersProps = {
    filterName: FilterKeys
    forceUpdate: TVoidFunc
}

export const FilterControllers: FC<FilterControllersProps> = ({
    filterName,
    forceUpdate,
}) => {
    const handleResetFilter = () => {
        resetFilter(filterName)
        forceUpdate()
    }

    return (
        <Stack direction={'row'} spacing={1} mt={2}>
            <Button variant="contained" form={filterName} type="submit">
                Применить
            </Button>
            <Button
                variant="outlined"
                color={'error'}
                onClick={handleResetFilter}
            >
                Cбросить
            </Button>
        </Stack>
    )
}
