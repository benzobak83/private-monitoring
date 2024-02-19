import { Box, Stack } from '@mui/material'
import { FC } from 'react'
import { TypesOfEquipmentTable } from '@/widgets/Settings/TypeOfEquipment/TypesOfEquipmentTable'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'

const TypesOfEquipment: FC = () => {
    return (
        <Box>
            <Stack direction={'row'} spacing={2} mb={1}>
                <TitlePage back>Типы оборудования</TitlePage>
            </Stack>
            <TypesOfEquipmentTable />
        </Box>
    )
}
export default TypesOfEquipment
