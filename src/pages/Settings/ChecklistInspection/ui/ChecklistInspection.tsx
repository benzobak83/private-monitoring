import { Box, Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { ChecklistInspectionItemsTable } from '@widgets/Settings/ChecklistInspection/ChecklistInspectionItemsTable'
import { CreateChecklistItemButton } from '@/features/Settings/ChecklistInspection/createItem'
import { EditChecklistInterspectionForm } from '@/features/Settings/ChecklistInspection/edit'
import { SortChecklistInspectionItemsTableProvider } from '@/features/Settings/ChecklistInspection/sortItems'
import {
    $checklistInspection,
    ChecklistInspectionItemProvider,
    getChecklistInspection,
    resetChecklistInspection,
} from '@entities/Settings/ChecklistInspection'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { useInit } from '@shared/lib/hooks/useInit'
import { WidgetLoading } from '@shared/ui/Loaders/WidgetLoading/WidgetLoading'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'

const ChecklistInspectionItem: FC = () => {
    const checklistInspection = useStore($checklistInspection)
    const getChecklistInspectionItemIsPending = useStore(
        getChecklistInspection.pending
    )

    const { init } = useInit()

    const { id } = useDefaultParams()

    useEffect(() => {
        getChecklistInspection(id)
    }, [id])

    useEffect(() => {
        return () => resetChecklistInspection()
    }, [])

    if (
        (getChecklistInspectionItemIsPending ||
            !Object.keys(checklistInspection).length) &&
        init
    ) {
        return <WidgetLoading label="Загрузка чеклиста..." />
    }
    return (
        <Box>
            <Stack direction={'row'} spacing={2} mb={1}>
                <TitlePage back>
                    Чеклист осмотров и проверок - №{checklistInspection.id} -{' '}
                    {checklistInspection.name}
                </TitlePage>
            </Stack>
            <Stack spacing={2} sx={{ width: '550px' }}>
                <MyPaper title="Название">
                    <EditChecklistInterspectionForm />
                </MyPaper>
                <MyPaper
                    title="Пункты чеклиста"
                    sx={{ width: 'fit-content' }}
                    rightContent={<CreateChecklistItemButton />}
                >
                    <ChecklistInspectionItemProvider>
                        <SortChecklistInspectionItemsTableProvider>
                            <ChecklistInspectionItemsTable />
                        </SortChecklistInspectionItemsTableProvider>
                    </ChecklistInspectionItemProvider>
                </MyPaper>
            </Stack>
        </Box>
    )
}
export default ChecklistInspectionItem
