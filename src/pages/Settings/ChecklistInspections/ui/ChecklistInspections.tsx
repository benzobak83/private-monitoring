import { Box, Stack } from '@mui/material'
import { FC } from 'react'
import { ChecklistInspectionTable } from '@widgets/Settings/ChecklistInspection/ChecklistInspectionTable'
import { CreateChecklistInspectionButton } from '@features/Settings/ChecklistInspection/create'
import { ChecklistInspectionProvider } from '@entities/Settings/ChecklistInspection'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'

const ChecklistInspections: FC = () => {
    return (
        <Box>
            <Stack direction={'row'} spacing={2} mb={1}>
                <TitlePage back>Чеклисты осмотров и проверок</TitlePage>
                <CreateChecklistInspectionButton />
            </Stack>
            <ChecklistInspectionProvider>
                <ChecklistInspectionTable />
            </ChecklistInspectionProvider>
        </Box>
    )
}

export default ChecklistInspections
