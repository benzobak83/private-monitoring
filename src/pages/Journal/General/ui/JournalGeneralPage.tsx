import { Box, Stack } from '@mui/material'
import { FC } from 'react'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'
import { NavButton } from '@shared/ui/NavButton/NavButton'

const BREAD_CRUMBS: TBreadCrumb[] = [
    { id: 1, label: 'Журналы', link: ROUTES.journal.general },
]

type TNavButton = {
    id: number
    label: string
    link: string
}

const NAV_BUTTONS: TNavButton[] = [
    {
        id: 1,
        label: 'Регламентные работы',
        link: ROUTES.journal.regulatoryWork,
    },
    {
        id: 2,
        label: 'Проверка оборудования',
        link: ROUTES.journal.inspectionCheck,
    },
    {
        id: 2,
        label: 'Наработка',
        link: ROUTES.journal.operatingTime,
    },
]

const BTN_SX = { height: '70px', width: '300px' }

const JournalGeneralPage: FC = () => {
    return (
        <Box>
            <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} />

            <Stack spacing={2} mt={1}>
                {NAV_BUTTONS.map((item) => (
                    <NavButton link={item.link} key={item.id} sx={BTN_SX}>
                        {item.label}
                    </NavButton>
                ))}
            </Stack>
        </Box>
    )
}
export default JournalGeneralPage
