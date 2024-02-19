import { Box, Stack } from '@mui/material'
import { FC } from 'react'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'
import { NavButton } from '@shared/ui/NavButton/NavButton'

const BREAD_CRUMBS: TBreadCrumb[] = [
    { id: 1, label: 'Отчёты', link: ROUTES.report.general },
]

type TNavButton = {
    id: number
    label: string
    link: string
}

const NAV_BUTTONS: TNavButton[] = [
    {
        id: 1,
        label: 'Моточасы и регламентные работы',
        link: ROUTES.report.motoHours,
    },
    {
        id: 2,
        label: 'Ремонт',
        link: ROUTES.report.repair,
    },
]

const BTN_SX = { height: '70px', width: '350px' }

const Reports: FC = () => {
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />

            <Stack spacing={1} mt={1}>
                {NAV_BUTTONS.map((item) => (
                    <NavButton link={item.link} key={item.id} sx={BTN_SX}>
                        {item.label}
                    </NavButton>
                ))}
            </Stack>
        </Box>
    )
}

export default Reports
