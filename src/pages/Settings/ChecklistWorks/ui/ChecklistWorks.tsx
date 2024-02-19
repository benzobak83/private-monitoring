import { Box, Stack } from '@mui/material'
import { FC } from 'react'
import { ChecklistWorkTable } from '@widgets/Settings/ChecklistWork/ChecklistWorkTable'
import { CreateChecklistWorkButton } from '@features/Settings/ChecklistWork/create'
import { ChecklistWorkProvider } from '@entities/Settings/ChecklistWork'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'

const ChecklistWorks: FC = () => {
    return (
        <Box>
            <Stack direction={'row'} spacing={2} mb={1}>
                <TitlePage back>Чеклисты регламентных работ</TitlePage>
                <CreateChecklistWorkButton />
            </Stack>
            <ChecklistWorkProvider>
                <ChecklistWorkTable />
            </ChecklistWorkProvider>
        </Box>
    )
}

export default ChecklistWorks
