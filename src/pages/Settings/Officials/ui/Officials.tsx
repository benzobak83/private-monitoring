import { Box, Stack } from '@mui/material'
import { FC } from 'react'
import { OfficialsTable } from '@widgets/Settings/Officials/OfficialsTable'
import { OfficialsFormProvider } from '@features/Settings/Officials/edit'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'

const Officials: FC = () => {
    return (
        <Box>
            <Stack direction={'row'} spacing={2} mb={1}>
                <TitlePage back>Должностные лица</TitlePage>
            </Stack>
            <OfficialsFormProvider>
                <OfficialsTable />
            </OfficialsFormProvider>
        </Box>
    )
}

export default Officials
