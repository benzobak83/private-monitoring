import { DefectCardLayoutAsync } from '@layouts/DefectCardLayout/ui/DefectCardLayout.async'
import { ObjectCardLayoutAsync } from '@layouts/ObjectCardLayout'
import { PageLayout } from '@layouts/PageLayout'
import { createBrowserRouter } from 'react-router-dom'
import { AdditionalAuthAsync } from '@pages/AdditionalAuth'
import { DefectCardAsync } from '@pages/Defect/DefectCard'
import { DefectListAsync } from '@pages/Defect/DefectList'
import { EquipmentCardAsync } from '@pages/Equipment/EquipmentCard'
import { EquipmentListAsync } from '@pages/Equipment/EquipmentList'
import { JournalGeneralPageAsync } from '@pages/Journal/General'
import { InspectionCheckAsync } from '@pages/Journal/InspectionCheck'
import { OperatingTimeAsync } from '@pages/Journal/OperatingTime'
import { RegulatoryWorkAsync } from '@pages/Journal/RegulatoryWork'
import { MainReditecterAsync } from '@pages/MainRedirecter'
import { MaterialsListAsync } from '@pages/MaterialsList'
import { DefectOfObjectAsync } from '@pages/Object/DefectOfObject'
import { EquipmentOfObjectAsync } from '@pages/Object/EquipmentOfObject'
import { ObjectListAsync } from '@pages/Object/ObjectList'
import { SchemaOfObjectAsync } from '@pages/Object/SchemaOfObject'
import { ShiftsOfObjectAsync } from '@pages/Object/ShiftsOfObject'
import { StateOfObjectAsync } from '@pages/Object/StateOfObject'
import { TaskForTodayAsync } from '@pages/Object/TaskForToday'
import { RegulatoryWorkListAsync } from '@pages/RegulatoryWork/RegulatoryWorkList'
import { ReportsAsync } from '@pages/Reports/General'
import { MotoHoursAsync } from '@pages/Reports/MotoHours'
import { RepairAsync } from '@pages/Reports/Repair'
import { AccessRightsAsync } from '@pages/Settings/AccessRights'
import { ChecklistInspectionAsync } from '@pages/Settings/ChecklistInspection'
import { ChecklistInspectionsAsync } from '@pages/Settings/ChecklistInspections'
import { ChecklistWorkAsync } from '@pages/Settings/ChecklistWork'
import { ChecklistWorksAsync } from '@pages/Settings/ChecklistWorks'
import { GeneralSettingsAsync } from '@pages/Settings/General'
import { OfficialsAsync } from '@pages/Settings/Officials'
import { StaffAsync } from '@pages/Settings/Staff'
import { SubdivisionAsync } from '@pages/Settings/Subdivision'
import { EditTypeOfEquipmentAsync } from '@pages/Settings/TypeOfEquipment'
import { TypesOfEquipmentAsync } from '@pages/Settings/TypesOfEquipment'
import { UpdateDataIn1CAsync } from '@pages/Settings/UpdateDataIn1c'
import { StartWorkAsync } from '@pages/Work/StartWork'
import { WorkAsync } from '@pages/Work/Work'
import { ROUTES } from '@shared/lib/consts/routes'
import { SuspenseLoader } from '@shared/ui/suspenses/SuspenseLoader'
import { Middlewares } from '../../../middleware/Middlewares'

export const routeConfig = createBrowserRouter([
    {
        element: <Middlewares />,
        children: [
            {
                element: <PageLayout />,
                children: [
                    {
                        path: ROUTES.index,
                        element: (
                            <SuspenseLoader>
                                <MainReditecterAsync />
                            </SuspenseLoader>
                        ),
                    },

                    //Логин
                    {
                        path: ROUTES.login,
                        element: (
                            <SuspenseLoader>
                                <AdditionalAuthAsync />
                            </SuspenseLoader>
                        ),
                    },

                    //Настройки
                    {
                        path: ROUTES.settings.general,
                        element: (
                            <SuspenseLoader>
                                <GeneralSettingsAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.settings.accessRights,
                        element: (
                            <SuspenseLoader>
                                <AccessRightsAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.settings.subdivision,
                        element: (
                            <SuspenseLoader>
                                <SubdivisionAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.settings.staff,
                        element: (
                            <SuspenseLoader>
                                <StaffAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.settings.typesOfEquipment,
                        element: (
                            <SuspenseLoader>
                                <TypesOfEquipmentAsync />
                            </SuspenseLoader>
                        ),
                    },

                    {
                        path: ROUTES.settings.typesOfEquipmentEdit,
                        element: (
                            <SuspenseLoader>
                                <EditTypeOfEquipmentAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.settings.inspectionChecklist,
                        element: (
                            <SuspenseLoader>
                                <ChecklistInspectionsAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.settings.inspectionChecklistItem,
                        element: (
                            <SuspenseLoader>
                                <ChecklistInspectionAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.settings.worksChecklist,
                        element: (
                            <SuspenseLoader>
                                <ChecklistWorksAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.settings.worksChecklistItem,
                        element: (
                            <SuspenseLoader>
                                <ChecklistWorkAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.settings.officials,
                        element: (
                            <SuspenseLoader>
                                <OfficialsAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.settings.updateDataIn1C,
                        element: (
                            <SuspenseLoader>
                                <UpdateDataIn1CAsync />
                            </SuspenseLoader>
                        ),
                    },

                    //Объект
                    {
                        path: ROUTES.object.general,
                        element: (
                            <SuspenseLoader>
                                <ObjectListAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.object.card,
                        element: (
                            <SuspenseLoader>
                                <ObjectCardLayoutAsync />
                            </SuspenseLoader>
                        ),
                        children: [
                            {
                                path: ROUTES.object.card,
                                element: (
                                    <SuspenseLoader>
                                        <EquipmentOfObjectAsync />
                                    </SuspenseLoader>
                                ),
                            },
                            {
                                path: ROUTES.object.state,
                                element: (
                                    <SuspenseLoader>
                                        <StateOfObjectAsync />
                                    </SuspenseLoader>
                                ),
                            },
                            {
                                path: ROUTES.object.schema,
                                element: (
                                    <SuspenseLoader>
                                        <SchemaOfObjectAsync />
                                    </SuspenseLoader>
                                ),
                            },
                            {
                                path: ROUTES.object.shifts,
                                element: (
                                    <SuspenseLoader>
                                        <ShiftsOfObjectAsync />
                                    </SuspenseLoader>
                                ),
                            },
                            {
                                path: ROUTES.object.defects,
                                element: (
                                    <SuspenseLoader>
                                        <DefectOfObjectAsync />
                                    </SuspenseLoader>
                                ),
                            },
                            {
                                path: ROUTES.object.tasksForToday,
                                element: (
                                    <SuspenseLoader>
                                        <TaskForTodayAsync />
                                    </SuspenseLoader>
                                ),
                            },
                        ],
                    },

                    //Оборудование
                    {
                        path: ROUTES.equipment.general,
                        element: (
                            <SuspenseLoader>
                                <EquipmentListAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.equipment.card,
                        element: (
                            <SuspenseLoader>
                                <EquipmentCardAsync />
                            </SuspenseLoader>
                        ),
                    },

                    //Мои Смены
                    {
                        path: ROUTES.work.general,
                        element: (
                            <SuspenseLoader>
                                <WorkAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.work.start,
                        element: (
                            <SuspenseLoader>
                                <StartWorkAsync />
                            </SuspenseLoader>
                        ),
                    },

                    //Регламентные работы
                    {
                        path: ROUTES.regulatoryWork.general,
                        element: (
                            <SuspenseLoader>
                                <RegulatoryWorkListAsync />
                            </SuspenseLoader>
                        ),
                    },

                    //Неисправности
                    {
                        path: ROUTES.defect.general,
                        element: (
                            <SuspenseLoader>
                                <DefectListAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.defect.card,
                        element: (
                            <SuspenseLoader>
                                <DefectCardLayoutAsync />
                            </SuspenseLoader>
                        ),
                        children: [
                            {
                                path: ROUTES.defect.card,
                                element: (
                                    <SuspenseLoader>
                                        <DefectCardAsync />
                                    </SuspenseLoader>
                                ),
                            },
                        ],
                    },

                    //Материалы
                    {
                        path: ROUTES.defect.materialsList,
                        element: (
                            <SuspenseLoader>
                                <MaterialsListAsync />
                            </SuspenseLoader>
                        ),
                    },

                    //журналы
                    {
                        path: ROUTES.journal.general,
                        element: (
                            <SuspenseLoader>
                                <JournalGeneralPageAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.journal.regulatoryWork,
                        element: (
                            <SuspenseLoader>
                                <RegulatoryWorkAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.journal.inspectionCheck,
                        element: (
                            <SuspenseLoader>
                                <InspectionCheckAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.journal.operatingTime,
                        element: (
                            <SuspenseLoader>
                                <OperatingTimeAsync />
                            </SuspenseLoader>
                        ),
                    },

                    //отчёты
                    {
                        path: ROUTES.report.general,
                        element: (
                            <SuspenseLoader>
                                <ReportsAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.report.motoHours,
                        element: (
                            <SuspenseLoader>
                                <MotoHoursAsync />
                            </SuspenseLoader>
                        ),
                    },
                    {
                        path: ROUTES.report.repair,
                        element: (
                            <SuspenseLoader>
                                <RepairAsync />
                            </SuspenseLoader>
                        ),
                    },
                ],
            },
        ],
    },
])
