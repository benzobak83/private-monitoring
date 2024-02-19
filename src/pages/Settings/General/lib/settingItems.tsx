import { ROUTES } from '@shared/lib/consts/routes'

type TSettingItem = {
    label: string
    link: string
    role?: string
}

export const leftSettingItems: TSettingItem[] = [
    { label: 'Права доступа', link: ROUTES.settings.accessRights },
    {
        label: 'Подразделения',
        link: ROUTES.settings.subdivision,
        role: 'rbac',
    },
    {
        label: 'Персонал',
        link: ROUTES.settings.staff,
        role: 'replacement',
    },
    {
        label: 'Типы оборудования',
        link: ROUTES.settings.typesOfEquipment,
        role: 'replacement',
    },
]
export const rightSettingItems: TSettingItem[] = [
    {
        label: 'Чеклисты осмотров и проверок',
        link: ROUTES.settings.inspectionChecklist,
    },
    {
        label: 'Чеклисты регламентных работы',
        link: ROUTES.settings.worksChecklist,
        role: 'rbac',
    },
    {
        label: 'Должностные лица',
        link: ROUTES.settings.officials,
        role: 'replacement',
    },
    {
        label: 'Обновления данных 1С',
        link: ROUTES.settings.updateDataIn1C,
        role: 'replacement',
    },
]
