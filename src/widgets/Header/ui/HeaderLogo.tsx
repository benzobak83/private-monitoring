import { Typography } from '@mui/material'
import { FC, memo } from 'react'
import { Link } from 'react-router-dom'

const logoSx = {
    fontSize: '25px',
    color: 'black',
}

export const HeaderLogo: FC = memo(() => {
    return (
        <Link to="/">
            <Typography variant="h1" sx={logoSx}>
                Мониторинг оборудования
            </Typography>
        </Link>
    )
})
