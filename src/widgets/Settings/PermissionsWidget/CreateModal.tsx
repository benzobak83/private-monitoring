import {
    Button,
    Checkbox,
    FormControlLabel,
    Modal,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import { Stack } from '@mui/system'
import { useStore } from 'effector-react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { $permissions, createRoleFx } from './store/Permissions'

type CreateModalProps = {
    isOpen: boolean
    onClose: () => void
}

const CreateModal: FC<CreateModalProps> = ({ isOpen, onClose }) => {
    const formMethodsCreate = useForm({
        defaultValues: {
            key: '',
            name: '',
            permissionIds: [],
        },
    })

    const permissions = useStore($permissions)

    const registerCreateForm = formMethodsCreate.register
    const handleCreateSubmit = formMethodsCreate.handleSubmit
    const resetCreateForm = formMethodsCreate.reset

    const onCreateSubmit = (data: any) => {
        onClose()
        createRoleFx({
            ...data,
            key: data.name,
        })
        resetCreateForm()
    }
    return (
        <Modal open={isOpen} onClose={onClose}>
            <Paper
                sx={{
                    padding: '20px',
                    width: '700px',
                    transform: 'translate(-50%, -50%)',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    height: '100vh',
                    overflow: 'scroll',
                }}
            >
                <FormProvider {...formMethodsCreate}>
                    <form onSubmit={handleCreateSubmit(onCreateSubmit)}>
                        <Stack spacing="20px">
                            <Typography variant="h5">Создание роли</Typography>
                            <TextField
                                variant="standard"
                                label="Название"
                                size="small"
                                {...registerCreateForm('name')}
                            />
                            <Stack alignItems="flex-start">
                                {permissions.map((permission) => (
                                    <FormControlLabel
                                        key={permission.key}
                                        control={
                                            <Checkbox
                                                size="small"
                                                {...registerCreateForm(
                                                    `permissionIds`
                                                )}
                                                value={permission.id}
                                            />
                                        }
                                        label={permission.name}
                                    />
                                ))}
                            </Stack>
                            <Stack
                                alignItems="flex-start"
                                spacing="20px"
                                direction="row"
                            >
                                <Button variant="outlined" onClick={onClose}>
                                    Отмена
                                </Button>
                                <Button variant="contained" type="submit">
                                    Сохранить
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </FormProvider>
            </Paper>
        </Modal>
    )
}

export default CreateModal
