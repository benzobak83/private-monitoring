import { Stack, Button } from '@mui/material'
import { FC, useEffect } from 'react'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { LoaderWrapper } from '@shared/ui/Wrappers/LoaderWrapper/LoaderWrapper'
import { TUseSortType } from '../model/types'

type SortTableControllersProps = {
    useSortStore: TUseSortType<(any & { id: number })[]>
    rows: (Record<string, any> & { id: number })[]
}

export const SortTableControllers: FC<SortTableControllersProps> = ({
    useSortStore,
    rows: rowsFromStore,
}) => {
    const { id } = useDefaultParams()

    const [{ sortQuery, rows, initRows, isStarting, isLoading }, setSortStore] =
        useSortStore((store) => store)

    const handleCancel = () => {
        setSortStore({ isStarting: false, rows: initRows })
    }
    const handleAccept = () => {
        setSortStore({ isLoading: true })
        const sotredRows = rows.map((row) => row.id)

        sortQuery(sotredRows, id).finally(() => {
            setSortStore({ isLoading: false, isStarting: false })
        })
    }

    useEffect(() => {
        setSortStore({
            rows: rowsFromStore,
            initRows: rowsFromStore,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowsFromStore])

    if (!isStarting) {
        return null
    }
    return (
        <LoaderWrapper loading={isLoading}>
            <Stack>
                <Button color="success" onClick={handleAccept}>
                    Применить изменения порядка
                </Button>
                <Button color="error" onClick={handleCancel}>
                    Отменить
                </Button>
            </Stack>
        </LoaderWrapper>
    )
}
