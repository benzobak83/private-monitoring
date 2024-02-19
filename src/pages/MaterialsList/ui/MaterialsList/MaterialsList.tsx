import { Stack } from '@mui/material'
import { FC } from 'react'
import { MaterialFilter } from '@/widgets/Material/MaterialFilter'
import { MaterialTable } from '@/widgets/Material/MaterialTable'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'

const MaterialsList: FC = () => {
    return (
        <>
            <TitlePage back>Список материалов на 10м счете</TitlePage>
            <Stack spacing={1.5}>
                <MaterialFilter />
                <MaterialTable />
            </Stack>
        </>
    )
}

export default MaterialsList
