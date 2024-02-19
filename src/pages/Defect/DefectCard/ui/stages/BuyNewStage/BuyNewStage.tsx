import { Divider, Stack } from '@mui/material'
import { FC } from 'react'
import { BuyNewWidget } from '@/widgets/Defect/BuyNewWidget'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'

const BuyNewStage: FC = () => {
    return (
        <Stack spacing={1.5}>
            <TitlePage>Приобретение нового</TitlePage>

            <Divider />
            <BuyNewWidget type={'create'} />
        </Stack>
    )
}
export default BuyNewStage
