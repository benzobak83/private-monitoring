export const ENDPOINTS = {
    settings: {
        checklist: {
            create: 'admin/checklist',
            delete: 'admin/checklist',
            edit: 'admin/checklist',
            get: 'admin/checklist', //получить один чеклист
            getList: 'admin/checklist/index',
            getForSelect: 'admin/checklist/select/',
            item: {
                //пункты чеклиста
                get: 'admin/checklist-item/',
                create: 'admin/checklist-item/',
                edit: 'admin/checklist-item/',
                delete: 'admin/checklist-item/',
                deleteAnswerOption: 'admin/checklist-option/',
            },
            sort: (id: number) => `admin/checklist/${id}/sort`,
        },
        typeOfEquipment: {
            edit: 'admin/type-equipment/',
            getList: 'admin/type-equipment/index/',
            get: 'admin/type-equipment/',
            delete: 'admin/type-equipment/',
            deleteChecklist: 'admin/type-equipment-checklist/',
        },
        official: {
            get: 'admin/manager/index',
            create: 'admin/manager',
        },
        subdivision: {
            get: 'admin/subdivision/index/',
            edit: 'admin/subdivision/',
        },
        staff: {
            getList: 'admin/employee/index/',
            create: 'admin/employee/',
            edit: 'admin/employee/',
        },
        updateDataIn1C: {
            getList: 'pub/data-fetch',
            updateOnlyChanged: 'pub/data-fetch',
            updateFull: 'pub/data-fetch',
        },
    },
    material: {
        getList: `pub/material/items`,
        getMaterialsActs: `pub/material`,
        getMaterialsActOfObjectByCompletingId: (
            defectId: number,
            completingId: number
        ) => `admin/malfunction/${defectId}/execution/${completingId}/material`,
    },
    object: {
        getList: 'admin/object/index',
        getItem: (id: number) => `admin/object/${id}`,
        attachToChecklist: (id: number) => `admin/object/${id}`,
        getSchema: (id: number) => `admin/object/${id}/schema`,
        editSchema: ({
            objectId,
            schemaId,
        }: {
            objectId: number
            schemaId: number
        }) => `admin/object/${objectId}/schema/${schemaId}`,
        uploadImageToSchema: (objectId: number) =>
            `admin/object/${objectId}/schema/image`,
        uploadFileToSchema: (objectId: number) =>
            `admin/object/${objectId}/schema/files`,
        startInspection: 'admin/check',
    },
    equipment: {
        getList: 'admin/equipment/index',
        getItem: (id: number) => `admin/equipment/${id}`,
        getOperatingTime: (equipmentId: number) =>
            `admin/equipment/${equipmentId}/operating-time`,
        addOperatingTime: (equipmentId: number) =>
            `admin/equipment/${equipmentId}/operating-time`,
        getOperatingTimeLogList: (equipmentId: number) =>
            `admin/equipment/${equipmentId}/operating-time/index`,
        getStatistics: 'admin/equipment/statistic',
        getOperatingTimeJournal: 'admin/journal/operating-time',
    },
    check: {
        getCheckOfHistory: (id: number) => `admin/check/${id}`,
        getHistory: 'admin/check/index',
        getHistoryForEquipment: (equipmentId: number) =>
            `admin/equipment/${equipmentId}/check/index`,
        complete: (id: number) => `admin/check/${id}`,
        getCheckJournal: 'admin/journal/checks',
    },
    defect: {
        getList: 'admin/malfunction/index',
        getItem: (defectId: number) => `admin/malfunction/${defectId}`,
        editPriority: (defectId: number) => `admin/malfunction/${defectId}`,
        getGraph: (equipmentId: number) =>
            `admin/equipment/${equipmentId}/malfunction`,
        getDefectsOfEquipment: (equipmentId: number) =>
            `admin/equipment/${equipmentId}/malfunction`,

        //FIX METHOD
        getFixMethod: (defectId: number) =>
            `admin/malfunction/${defectId}/diagnostic`,
        defineFixMethod: (defectId: number) =>
            `admin/malfunction/${defectId}/diagnostic`,
        agreementByResponsiblePerson: (defectId: number) =>
            `admin/malfunction/${defectId}/diagnostic/approval`,
        goToPlanningWork: (defectId: number, diagnosticId: number) =>
            `admin/malfunction/${defectId}/diagnostic/${diagnosticId}`,
        //PLANNING WORK
        getPlanningWork: (defectId: number) =>
            `admin/malfunction/${defectId}/planning`,
        completePlanningWork: (defectId: number, planningId: number) =>
            `admin/malfunction/${defectId}/planning/${planningId}`,
        goToCompletingWork: (defectId: number, planningId: number) =>
            `admin/malfunction/${defectId}/planning/${planningId}`,
        agreementByEmployee: (defectId: number) =>
            `admin/malfunction/${defectId}/planning/approval`,
        //COMPLETING WORK
        getCompletingWork: (defectId: number) =>
            `admin/malfunction/${defectId}/execution`,
        completingWork: (defectId: number, executionId: number) =>
            `admin/malfunction/${defectId}/execution/${executionId}`,
        transferWorkToHeadOfTheDepartment: (defectId: number) =>
            `todo${defectId}`,
        agreementByResponsiblePersonCompletingWork: (defectId: number) =>
            `admin/malfunction/${defectId}/execution/approval`,
        agreementByHeadOfTheDepartment: (defectId: number) =>
            `admin/malfunction/${defectId}/execution/approval`,
        //BUY NEW
        putNewEquipmentIntoOperation: (defectId: number) =>
            `admin/malfunction/${defectId}/purchasing`,
        getBuyNewStage: (defectId: number) =>
            `admin/malfunction/${defectId}/purchasing`,
        //WRITE OFF MATERIALS
        pickActOfMaterial: (defectId: number) =>
            `admin/malfunction/${defectId}/material/`,
        //LOGS
        getLogs: (defectId: number) => `admin/malfunction/${defectId}/logs`,
    },
    work: {
        getList: 'admin/work/index',
        getWorkOfObjectList: (objectId: number) =>
            `admin/object/${objectId}/work/index`,
        getCurrentWork: 'admin/work/status',
        startWork: 'admin/work',
        getStartWorkList: 'admin/work/object/index',
        completeWork: (id: number) => `admin/work/${id}`,
    },
    task: {
        getTasksForTodayOfObject: (objectId: number) =>
            `admin/object/${objectId}/check/index`,

        getUnfinishedTasks: 'admin/work/unfinished',
    },
    regulatoryWork: {
        getList: 'todo',
    },
    helpers: {
        select: {
            user: 'admin/user/select',
            responsibleUser: 'pub/material/users',
            subdivision: 'admin/subdivision/select',
            object: 'admin/object/select',
            direction: 'admin/direction/select',
            directionActivity: 'admin/direction-activity/select',
            territory: 'admin/territory/select',
            typeOfEquipment: 'admin/type-equipment/select',
            equipment: 'admin/equipment/select',
        },
    },
    multimedia: {
        file: {
            generateUrl: (id: number) => `multimedia/file/${id}`,
            delete: (id: number) => `multimedia/file/${id}`,
            upload: `multimedia/file/upload`,
        },
    },
    auth: {
        bitrix: {
            login: 'pub/auth',
        },
        additional: {
            login: '/pub/auth/login',
            initUser: '/pub/auth/user',
        },
    },
}
