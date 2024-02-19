import { Box, Stack, Divider } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { EditObjectBtn } from '@/features/Object/editObject'
import { $objectItem } from '@entities/Object'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'
import { ObjectInformation } from './ObjectInformation'

export const ObjectHeader: FC = () => {
    const object = useStore($objectItem)
    return (
        <Stack direction="row" alignItems={'flex-start'} spacing={2} mt={1}>
            <Box>
                <Stack direction="row" alignItems={'center'} spacing={2} mt={1}>
                    <TitlePage bottomMarginNeed={false} back>
                        {object.name}
                    </TitlePage>
                    <EditObjectBtn />
                </Stack>
            </Box>
            <Divider orientation="vertical" flexItem />
            <ObjectInformation />
        </Stack>
    )
}
