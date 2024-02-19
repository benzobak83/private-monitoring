import { Stack } from '@mui/material'
import { FC } from 'react'
import { UpdateDataIn1CTable } from '@/widgets/Settings/UpdateDataIn1C/UpdateDataIn1CTable'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'

const UpdateDataIn1C: FC = () => {
    return (
        <Stack maxWidth={'880px'}>
            <TitlePage back>Обновления данных 1С</TitlePage>
            <UpdateDataIn1CTable />
        </Stack>
    )
}
export default UpdateDataIn1C
