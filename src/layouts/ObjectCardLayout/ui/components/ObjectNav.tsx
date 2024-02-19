import { SxProps, Theme, Box } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useStore } from 'effector-react'
import { FC, ReactNode, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { $objectItem } from '@entities/Object'
import { ROUTES } from '@shared/lib/consts/routes'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { StateStatusOfObjectNav } from './StateStatusOfObjectNav'

type ObjectNavButton = {
    label: ReactNode
    link: string
}

type ObjectNavProps = {
    sx?: SxProps<Theme>
}

export const ObjectNav: FC<ObjectNavProps> = ({ sx }) => {
    const object = useStore($objectItem)

    const { pathname } = useLocation()
    const { id } = useDefaultParams()

    const NAV_BUTTONS: ObjectNavButton[] = useMemo(() => {
        return [
            {
                label: `Оборудование (${object.equipmentCount})`,
                link: ROUTES.object.cardGet(id),
            },
            {
                label: object.check ? (
                    <StateStatusOfObjectNav result={object.check?.result} />
                ) : (
                    'Cостояние'
                ),
                link: ROUTES.object.stateGet(id),
            },
            { label: 'Схема', link: ROUTES.object.schemaGet(id) },
            { label: 'Смены', link: ROUTES.object.shiftGet(id) },
            {
                label: `Неисправности (${object?.malfunctionCount})`,
                link: ROUTES.object.defectsGet(id),
            },
            {
                label: `Задачи на сегодня (${object.checkCount})`,
                link: ROUTES.object.tasksForTodayGet(id),
            },
        ]
    }, [
        id,
        object.equipmentCount,
        object.checkCount,
        object.check,
        object?.malfunctionCount,
    ])

    return (
        <Box sx={{ ...sx, width: 'fit-content' }}>
            <Tabs aria-label="wrapped label tabs example" value={pathname}>
                {NAV_BUTTONS.map(({ link, label }) => (
                    <Tab
                        value={link}
                        label={label}
                        key={link}
                        component={Link}
                        to={link}
                    />
                ))}
            </Tabs>
        </Box>
    )
}
