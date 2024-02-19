import { Box, Stack } from '@mui/material'
import { useStore, useStoreMap } from 'effector-react'
import { FC, useEffect, useState } from 'react'
import { HistoryOfInspectionCheckForEquipmentTable } from '@/widgets/Check/HistoryOfInspectionCheckForEquipmentTable'
import { HistoryOfRegulatoryWorkCheckForEquipmentTable } from '@/widgets/Check/HistoryOfRegulatoryWorkCheckForEquipmentTable'
import { DefectsOfEquipmentGraph } from '@/widgets/Defect/DefectsOfEquipmentGraph'
import { DefectsOfEquipmentTable } from '@/widgets/Defect/DefectsOfEquipmentTable'
import { OperatingTimeTable } from '@/widgets/Equipment/OperatingTimeTable'
import { SheduleWorkOfEquipmentTable } from '@/widgets/Equipment/SheduleWorkOfEquipmentTable/ui/SheduleWorkOfEquipmentTable'
import { EquipmentBlock, EquipmentInfoBlock } from '@entities/Equipment'
import {
    $equipmentItem,
    getEquipmentItemFx,
    resetEquipmentItem,
} from '@entities/Equipment/model/getItem'
import {
    $typeOfEquipment,
    getTypeOfEquipmentFx,
} from '@entities/Settings/TypesOfEquipment'
import { temporarilyOverflow } from '@shared/lib/helpers/temporarilyOverflow'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { WidgetLoading } from '@shared/ui/Loaders/WidgetLoading/WidgetLoading'
import { EquipmentCardBreadCrumbs } from './components/EquipmentCardBreadCrumbs'
import { OperatingTimeReadings } from './components/OperatingTimeReadings'
import { StatusCheckSchedule } from './components/StatusCheckSchedule'

const EquipmentCard: FC = () => {
    const equipment = useStore($equipmentItem)
    const checklistOfInspection = useStoreMap(
        $typeOfEquipment,
        (typeOfEquipment) => typeOfEquipment.checklistInspection?.[0]?.checklist
    )
    const checklistsOfRegulatoryWork = useStoreMap(
        $typeOfEquipment,
        (typeOfEquipment) =>
            typeOfEquipment.checklistMaintenance?.map(
                (checklistMaintenance) => checklistMaintenance.checklist
            )
    )

    const { id } = useDefaultParams()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getEquipmentItemFx(id).finally(() => {
            setLoading(false)
            temporarilyOverflow()
        })

        return () => {
            resetEquipmentItem()
        }
    }, [id])

    useEffect(() => {
        if (!equipment?.typeEquipment?.id) return

        getTypeOfEquipmentFx(equipment?.typeEquipment?.id)
    }, [equipment?.typeEquipment?.id])

    if (loading) {
        return <WidgetLoading label="Загрузка карточки оборудования..." />
    }
    return (
        <Box>
            <EquipmentCardBreadCrumbs />
            <EquipmentInfoBlock />
            {equipment?.object?.id && (
                <Stack spacing={2} mt={2}>
                    <Stack direction="row" spacing={2}>
                        <EquipmentBlock
                            title="Проверка состояния (осмотры)"
                            firstStateSlot={{
                                name: 'Журнал',
                                element: (
                                    <HistoryOfInspectionCheckForEquipmentTable />
                                ),
                            }}
                            secondStateSlot={{
                                name: 'Расписание',
                                element: (
                                    <StatusCheckSchedule
                                        checklist={checklistOfInspection}
                                    />
                                ),
                            }}
                            animation="0.7s ease-out slideFromLeft"
                        />
                        <EquipmentBlock
                            title="Регламентные работы"
                            firstStateSlot={{
                                name: 'Журнал',
                                element: (
                                    <HistoryOfRegulatoryWorkCheckForEquipmentTable />
                                ),
                            }}
                            secondStateSlot={{
                                name: 'Расписание',
                                element: (
                                    <SheduleWorkOfEquipmentTable
                                        checklists={checklistsOfRegulatoryWork}
                                    />
                                ),
                            }}
                            animation="1s ease-out slideFromRight"
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <EquipmentBlock
                            title="Неисправности"
                            firstStateSlot={{
                                name: 'График',
                                element: <DefectsOfEquipmentGraph />,
                            }}
                            secondStateSlot={{
                                name: 'Список',
                                element: <DefectsOfEquipmentTable />,
                            }}
                            animation="1s ease-out slideFromLeft"
                        />
                        <EquipmentBlock
                            title="Наработка"
                            firstStateSlot={{
                                name: 'Показания',
                                element: <OperatingTimeReadings />,
                            }}
                            secondStateSlot={{
                                name: 'Журнал',
                                element: <OperatingTimeTable />,
                            }}
                            animation="0.7s ease-out slideFromRight"
                        />
                    </Stack>
                </Stack>
            )}
        </Box>
    )
}
export default EquipmentCard
