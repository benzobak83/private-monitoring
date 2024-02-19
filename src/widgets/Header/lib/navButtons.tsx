import AssessmentIcon from '@mui/icons-material/Assessment'
import ConstructionIcon from '@mui/icons-material/Construction'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import WarehouseIcon from '@mui/icons-material/Warehouse'
import WarningIcon from '@mui/icons-material/Warning'
import { ROUTES } from '@shared/lib/consts/routes'

type TNavButtons = {
    label: string
    link?: string
    href?: string
    icon: JSX.Element
}

export const NAV_BUTTONS: TNavButtons[] = [
    {
        label: 'Работа',
        link: ROUTES.work.general,
        icon: <HomeRepairServiceIcon />,
    },
    { label: 'Объекты', link: ROUTES.object.general, icon: <WarehouseIcon /> },
    {
        label: 'Оборудование',
        link: ROUTES.equipment.general,
        icon: <ConstructionIcon />,
    },

    {
        label: 'Неисправности',
        link: ROUTES.defect.general,
        icon: <WarningIcon />,
    },
    {
        label: 'Журналы',
        link: ROUTES.journal.general,
        icon: <ImportContactsIcon />,
    },
    { label: 'Отчёты', link: ROUTES.report.general, icon: <AssessmentIcon /> },
    {
        label: 'Настройки',
        link: ROUTES.settings.general,
        icon: <SettingsSuggestIcon />,
    },
    {
        label: 'Инструкция',
        href: 'https://crm.vdkanal.ru/docs/shared/path/%D0%98%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D0%B8%D0%B8/%D0%9F%D0%90%D0%9A%20%D0%A1%D0%90%D0%91%D0%9F/%D0%9C%D0%BE%D0%BD%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%BD%D0%B3%20%D0%BE%D0%B1%D0%BE%D1%80%D1%83%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F',
        icon: <IntegrationInstructionsIcon />,
    },
]
