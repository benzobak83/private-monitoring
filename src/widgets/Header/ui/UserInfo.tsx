import PersonIcon from '@mui/icons-material/Person'
import { Tab, Typography, Tooltip } from '@mui/material'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { LogoutBtn } from '@/features/Auth/logout'
import { $auth } from '@entities/Auth'

export const UserInfo: FC = () => {
    const auth = useStore($auth)
    return (
        <Tooltip
            disableFocusListener
            enterTouchDelay={0}
            color="light"
            title={!auth?.user?.isBitrix24User && <LogoutBtn />}
        >
            <Tab
                label={<Typography variant="h6">{auth?.user?.name}</Typography>}
                icon={<PersonIcon />}
                iconPosition="start"
                disableRipple
                sx={{ maxWidth: '200px', cursor: 'default' }}
            />
        </Tooltip>
    )
}
