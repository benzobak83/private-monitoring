import { useStore } from 'effector-react'
import { FC, useMemo } from 'react'
import { $equipmentItem } from '@entities/Equipment'
import { transformObjectToQueryFilter } from '@entities/Filter'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'

export const EquipmentCardBreadCrumbs: FC = () => {
    const equipment = useStore($equipmentItem)
    const BREAD_CRUMBS: TBreadCrumb[] = useMemo(
        () =>
            equipment?.object?.id
                ? [
                      {
                          id: 1,
                          label: 'Оборудование',
                          link: ROUTES.equipment.general,
                      },
                      {
                          id: 2,
                          label: equipment?.subdivision?.name,
                          link:
                              ROUTES.equipment.general +
                              `${transformObjectToQueryFilter({
                                  subdivisionId: equipment?.subdivision?.id,
                              })}`,
                          tooltip: `Перейти к списку оборудования с подразделением "${equipment?.subdivision?.name}"`,
                      },
                      {
                          id: 3,
                          label: equipment?.object?.name,
                          link:
                              ROUTES.equipment.general +
                              `${transformObjectToQueryFilter({
                                  objectId: equipment?.object?.id,
                              })}`,
                          tooltip: `Перейти к списку оборудования с объектом "${equipment?.object?.name}"`,
                      },
                  ]
                : [
                      {
                          id: 1,
                          label: 'Оборудование',
                          link: ROUTES.equipment.general,
                      },
                  ],
        [equipment.object, equipment?.subdivision]
    )
    return <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} sx={{ mb: 1 }} />
}
