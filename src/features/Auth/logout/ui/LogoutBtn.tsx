import { Button } from '@mui/material'
import { FC } from 'react'
import { logoutEvent } from '../model/logout'

export const LogoutBtn: FC = () => {
    return (
        <Button sx={{ color: 'white ' }} onClick={() => logoutEvent()}>
            Выйти
        </Button>
    )
}
