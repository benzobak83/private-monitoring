import { useStore } from 'effector-react'
import { FC, useMemo } from 'react'
import { $defect } from '@entities/Defect'
import { transformObjectToQueryFilter } from '@entities/Filter'
import { ROUTES } from '@shared/lib/consts/routes'
import {
    MyBreadCrumbs,
    TBreadCrumb,
} from '@shared/ui/MyBreadCrumbs/MyBreadCrumbs'

export const DefectBreadcrumbs: FC = () => {
    const defect = useStore($defect)
    const BREAD_CRUMBS: TBreadCrumb[] = useMemo(
        () =>
            defect?.object?.id
                ? [
                      {
                          id: 1,
                          label: 'Неисправности',
                          link: ROUTES.defect.general,
                      },
                      {
                          id: 2,
                          label: defect?.subdivision?.name,
                          link:
                              ROUTES.defect.general +
                              `${transformObjectToQueryFilter({
                                  subdivisionId: defect?.subdivision?.id,
                              })}`,
                          tooltip: `Перейти к списку неисправностей с подразделением "${defect?.subdivision?.name}"`,
                      },
                      {
                          id: 3,
                          label: defect?.object?.name,
                          link:
                              ROUTES.defect.general +
                              `${transformObjectToQueryFilter({
                                  objectId: defect?.object?.id,
                              })}`,
                          tooltip: `Перейти к списку неисправностей с объектом "${defect?.object?.name}"`,
                      },
                  ]
                : [
                      {
                          id: 1,
                          label: 'Неисправности',
                          link: ROUTES.defect.general,
                      },
                  ],
        [defect.object, defect?.subdivision]
    )
    return <MyBreadCrumbs breadCrumbs={BREAD_CRUMBS} sx={{ mb: 1 }} />
}
