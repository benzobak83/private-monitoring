import { Button, Modal, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { SearchUserSelect } from '@entities/User'
import { revokePermissionFx } from './store/EditPermission'

type GrantModalProps = {
    isOpen: boolean
    onClose: () => void
    role: number
}

const GrantModal: FC<GrantModalProps> = ({ isOpen, onClose, role }) => {
    const formMethodsGrant = useForm({
        defaultValues: {
            userId: 0,
        },
    })

    const handleSubmitGrant = formMethodsGrant.handleSubmit

    const onSubmit = ({ userId }: { userId: number }) => {
        onClose()
        revokePermissionFx({ userId, roleId: role, type: 'grant' })
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Paper
                sx={{
                    padding: '20px',
                    width: '400px',
                    transform: 'translate(-50%, -50%)',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    overflow: 'scroll',
                }}
            >
                <FormProvider {...formMethodsGrant}>
                    <form onSubmit={handleSubmitGrant(onSubmit)}>
                        <Stack spacing="20px">
                            <SearchUserSelect
                                label="Пользователь"
                                name="userId"
                            />
                            <Typography variant="caption">
                                Введите имя пользователя, которого хотите
                                добавить
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Добавить пользователя
                            </Button>
                        </Stack>
                    </form>
                </FormProvider>
            </Paper>
        </Modal>
    )
}

export default GrantModal
