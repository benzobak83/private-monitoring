import { Box, Stack } from '@mui/material'
import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { ChecklistWorkItemsTable } from '@widgets/Settings/ChecklistWork/ChecklistWorkItemsTable'
import { CreateChecklistItemButton } from '@/features/Settings/ChecklistWork/createItem'
import { EditChecklistWorkForm } from '@/features/Settings/ChecklistWork/edit'
import { SortChecklistWorkItemsTableProvider } from '@/features/Settings/ChecklistWork/sortItems'
import {
    $checklistWork,
    ChecklistWorkItemProvider,
    getChecklistWork,
} from '@entities/Settings/ChecklistWork'
import { useDefaultParams } from '@shared/lib/hooks/useDefaultParams'
import { useInit } from '@shared/lib/hooks/useInit'
import { WidgetLoading } from '@shared/ui/Loaders/WidgetLoading/WidgetLoading'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'
import { MyPaper } from '@shared/ui/Wrappers/MyPaper/MyPaper'

const ChecklistWorkItem: FC = () => {
    const checklistWork = useStore($checklistWork)
    const getChecklistWorkItemIsPending = useStore(getChecklistWork.pending)

    const { init } = useInit()

    const { id } = useDefaultParams()

    useEffect(() => {
        getChecklistWork(id)
    }, [id])

    if (
        (getChecklistWorkItemIsPending || !Object.keys(checklistWork).length) &&
        init
    ) {
        return <WidgetLoading label="Загрузка чеклиста..." />
    }
    return (
        <Box>
            <Stack direction={'row'} spacing={2} mb={1}>
                <TitlePage back>
                    Чеклист регламентных работ - №{checklistWork.id} -{' '}
                    {checklistWork.name}
                </TitlePage>
            </Stack>
            <Stack spacing={2} sx={{ width: '550px' }}>
                <MyPaper title="Название">
                    <EditChecklistWorkForm />
                </MyPaper>
                <MyPaper
                    title="Пункты чеклиста"
                    sx={{ width: 'fit-content' }}
                    rightContent={<CreateChecklistItemButton />}
                >
                    <ChecklistWorkItemProvider>
                        <SortChecklistWorkItemsTableProvider>
                            <ChecklistWorkItemsTable />
                        </SortChecklistWorkItemsTableProvider>
                    </ChecklistWorkItemProvider>
                </MyPaper>
            </Stack>
        </Box>
    )
}
export default ChecklistWorkItem
