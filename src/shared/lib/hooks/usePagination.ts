import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getValueFromLocalStorageByKeyWithPath } from '../helpers/getValueFromLocalStorageByKeyWithPath'
import { LOCAL_STORAGE_KEY_PAGE } from './../consts/localStorageKeys'

export const usePagination = (initPage: number | string | null | void) => {
    const { pathname } = useLocation()

    const { page: pageLS, limit: limitLS } =
        getValueFromLocalStorageByKeyWithPath(LOCAL_STORAGE_KEY_PAGE)

    const [page, setPage] = useState<number | string>(pageLS || initPage || 1)
    const [rowsPerPage, setRowsPerPage] = useState<number>(limitLS || 20)
    const [countRows, setCountRows] = useState<number>()

    const handleChangeRowsPerPage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(+event.target.value)
            setPage(initPage || 1)
        },
        [initPage]
    )

    useEffect(() => {
        localStorage.setItem(
            LOCAL_STORAGE_KEY_PAGE + pathname,
            JSON.stringify({
                page,
                limit: rowsPerPage,
            })
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage])

    return {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        countRows,
        setCountRows,
        handleChangeRowsPerPage,
    }
}
