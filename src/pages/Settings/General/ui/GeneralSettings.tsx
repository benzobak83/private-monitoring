import { Box, Stack } from '@mui/material'
import { FC } from 'react'
import { NavButton } from '@shared/ui/NavButton/NavButton'
import { TitlePage } from '@shared/ui/TitlePage/TitlePage'
import { leftSettingItems, rightSettingItems } from '../lib/settingItems'

//TODO: отфильтровать кнопки в зависимости их роли (когда будет бэк)

const BTN_SX = { height: '70px', width: '300px' }

const GeneralSettings: FC = () => {
    return (
        <Box>
            <TitlePage back>Настройки</TitlePage>
            <Stack direction="row" spacing={2}>
                <Stack spacing={2}>
                    {leftSettingItems.map(({ link, label }, i) => {
                        return (
                            <NavButton link={link} key={i} sx={BTN_SX}>
                                {label}
                            </NavButton>
                        )
                    })}
                </Stack>
                <Stack spacing={2}>
                    {rightSettingItems.map(({ link, label }, i) => {
                        return (
                            <NavButton link={link} key={i} sx={BTN_SX}>
                                {label}
                            </NavButton>
                        )
                    })}
                </Stack>
            </Stack>
        </Box>
    )
}

export default GeneralSettings
