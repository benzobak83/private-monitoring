import { Pagination, Stack, TablePagination } from '@mui/material'
import { FC, memo, useCallback, useEffect } from 'react'
import { useInit } from '../../../lib/hooks/useInit'

type MyTablePaginationProps = {
    pagesCount: number | undefined
    rowsCount: number | undefined
    page: number | string
    setPage: React.Dispatch<React.SetStateAction<string | number>>
    rowsPerPage: number
    // если изменится фильтр - обновлять страницу, при первом изменении фильтра не надо изменять, чтобы не сбивало закэшированный пэйдж
    filter?: Record<string, any>
    handleChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void
}

export const MyTablePagination: FC<MyTablePaginationProps> = memo(
    ({
        pagesCount,
        rowsCount,
        page,
        setPage,
        filter,
        rowsPerPage,
        handleChangeRowsPerPage,
    }) => {
        const { init } = useInit()
        const handleChangePage = useCallback(
            (e: any, page: string | number) => {
                setPage(page)
            },
            [setPage]
        )

        useEffect(() => {
            if (init) return
            if (!filter) return
            setPage(1)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [filter])

        useEffect(() => {
            if (!pagesCount) return

            if (Number(page) > pagesCount) {
                //если закэшированая страница больше не содержит айтемы - сбрасывать до 1
                setPage(1)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [page, pagesCount])

        if (!pagesCount || !rowsCount) {
            return null
        }
        return (
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Pagination
                    count={pagesCount}
                    page={Number(page)}
                    onChange={handleChangePage}
                />

                {!!rowsCount && (
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={rowsCount}
                        rowsPerPage={rowsPerPage}
                        page={Number(page) - 1}
                        onPageChange={(e, page) =>
                            handleChangePage(e, page + 1)
                        }
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelDisplayedRows={({ from, to, count }) => {
                            return '' + from + '-' + to + ' из ' + count
                        }}
                        labelRowsPerPage="Количество строк"
                    />
                )}
            </Stack>
        )
    }
)
