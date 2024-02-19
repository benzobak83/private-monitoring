import { Typography, Box } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { $auth } from '@entities/Auth'
import { warningColor } from '@shared/styles/variables/_export.module.scss'

const typographyParams = {
    color: warningColor,
}

export const Notification: FC = () => {
    const auth = useStore($auth)
    return (
        <Box>
            <Typography {...typographyParams}>
                * Для начала работы выберите помещение в котором начинаете
                смену.
            </Typography>
            <Typography {...typographyParams}>
                * Вы являетесь сотрудником подразделения - "
                {auth.user.subdivision?.name}", поэтому вы можете начать наботу
                только на объекте, относящемся к этому подразделению.
            </Typography>
        </Box>
    )
}
