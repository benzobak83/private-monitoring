import { Box } from '@mui/material'
import { FC } from 'react'
import { PermissionsWidget } from '@widgets/Settings/PermissionsWidget'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'

const AccessRights: FC = () => {
    return (
        <Box>
            <TitlePage back>Права доступа</TitlePage>
            <PermissionsWidget />
        </Box>
    )
}
export default AccessRights
