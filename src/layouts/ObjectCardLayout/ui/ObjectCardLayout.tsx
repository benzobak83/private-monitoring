import { Box, Divider } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { transformObjectToQueryFilter } from '@entities/Filter'
import { $objectItem, getObjectItemFx, resetObjectItem } from '@entities/Object'
import { ROUTES } from '@shared/lib/consts/routes'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { WidgetLoading } from '@shared/ui/Loaders/WidgetLoading/WidgetLoading'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'
import { ObjectHeader } from './components/ObjectHeader'
import { ObjectNav } from './components/ObjectNav'

const ObjectCardLayout: FC = () => {
    const object = useStore($objectItem)

    const [loading, setLoading] = useState(true)

    const BREAD_CRUMBS = useMemo<TBreadCrumb[]>(
        () => [
            { id: 1, label: 'Объект', link: ROUTES.object.general },
            {
                id: 2,
                label: object?.subdivision?.name,
                link:
                    ROUTES.object.general +
                    `${transformObjectToQueryFilter({
                        subdivisionId: object?.subdivision?.id,
                    })}`,
                tooltip: `Перейти к списку объектов с подразделением ${object?.subdivision?.name}`,
            },
            { id: 3, label: object.name },
        ],
        [object]
    )

    const { id } = useDefaultParams()

    useEffect(() => {
        getObjectItemFx(id).finally(() => setLoading(false))
    }, [id])

    useEffect(() => {
        return () => resetObjectItem()
    }, [])

    if (loading) {
        return <WidgetLoading label="Загрузка объекта..." />
    }

    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />
            <ObjectHeader />
            <Divider flexItem orientation="horizontal" sx={{ mt: 0.5 }} />
            <ObjectNav />
            <Divider flexItem orientation="horizontal" />
            <Outlet />
        </Box>
    )
}
export default ObjectCardLayout
