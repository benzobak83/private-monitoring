import { Paper, Stack, Divider } from '@mui/material'
import { FC, memo } from 'react'
import { CompleteWorkForHeaderBtn } from '@/features/Work/completeWork'
import { WorkStatusForHeader } from '@entities/Work'
import { AppMenu } from './AppMenu'
import { HeaderLogo } from './HeaderLogo'
import { UserInfo } from './UserInfo'

const Header: FC = memo(() => {
    return (
        <Paper
            elevation={3}
            sx={{
                mt: 2.5,
                mb: 2,
                borderRadius: '1rem',
            }}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                paddingLeft={2}
                paddingRight={2}
                justifyContent={'space-between'}
            >
                <Stack direction={'row'} alignItems="center" spacing={3}>
                    <HeaderLogo />
                    <Divider orientation="vertical" flexItem />
                    <WorkStatusForHeader
                        completeWorkBtnSlot={<CompleteWorkForHeaderBtn />}
                    />
                </Stack>
                <Stack direction={'row'} spacing={1} alignItems="center">
                    <UserInfo />
                    <AppMenu />
                </Stack>
            </Stack>
        </Paper>
    )
})

export default memo(Header)
