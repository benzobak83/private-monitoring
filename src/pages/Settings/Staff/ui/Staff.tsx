import { Box, Stack } from '@mui/material'
import { FC } from 'react'
import { StaffFilter } from '@widgets/Settings/Staff/StaffFilter'
import { StaffTable } from '@widgets/Settings/Staff/StaffTable'
import { StaffProvider } from '@entities/Settings/Staff'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'

const Staff: FC = () => {
    return (
        <Box>
            <Stack direction={'row'} spacing={2} mb={1}>
                <TitlePage back>Персонал</TitlePage>
            </Stack>
            <StaffFilter />
            <StaffProvider>
                <StaffTable />
            </StaffProvider>
        </Box>
    )
}

export default Staff
