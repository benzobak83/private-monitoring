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
import { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { $permissions, $roles, updateRoleFx } from './store/Permissions'

type EditModalProps = {
    isOpen: boolean
    onClose: () => void
    role: number
}

const EditModal: FC<EditModalProps> = ({ isOpen, onClose, role }) => {
    const roles = useStore($roles)
    const permissions = useStore($permissions)

    const [roleId] = useState<number>(role)

    const formMethodsEdit = useForm({
        defaultValues: {
            id: 0,
            key: '',
            name: '',
            permissionIds: [],
        },
    })

    const registerEditForm = formMethodsEdit.register
    const handleSubmitEdit = formMethodsEdit.handleSubmit
    const setEditFormValue = formMethodsEdit.setValue

    const onEditSubmit = (data: any) => {
        data.id = roleId
        const roleEdited = roles.find((item) => item.id === role)
        if (roleEdited) {
            updateRoleFx({
                ...data,
                key: roleEdited.key,
            })
        }
        onClose()
    }

    useEffect(() => {
        const key = roles
            .find((role) => role.id == roleId)
            ?.key?.split('documents:')[1]
        setEditFormValue('key', String(key))
        setEditFormValue(
            'name',
            roles.find((role) => role.id == roleId)?.name || ''
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roleId])
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
                <FormProvider {...formMethodsEdit}>
                    <form onSubmit={handleSubmitEdit(onEditSubmit)}>
                        <Stack spacing="20px">
                            <Typography variant="h5">
                                Редактирование роли
                            </Typography>
                            <TextField
                                value={roleId}
                                label="id"
                                size="small"
                                {...registerEditForm('id')}
                                type="hidden"
                                sx={{ display: 'none' }}
                            />
                            <TextField
                                variant="standard"
                                label="Название"
                                size="small"
                                {...registerEditForm('name')}
                            />
                            <Stack alignItems="flex-start">
                                {permissions?.map((permission) => {
                                    const selectedRole = roles.find(
                                        (role) => role.id === roleId
                                    )
                                    const rolePermissionIds =
                                        selectedRole?.permissions?.map(
                                            (rolePermission) =>
                                                rolePermission.id
                                        )

                                    const defaultChecked =
                                        rolePermissionIds?.includes(
                                            permission?.id
                                        )

                                    return (
                                        <FormControlLabel
                                            key={permission.name}
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    {...registerEditForm(
                                                        `permissionIds`
                                                    )}
                                                    defaultChecked={
                                                        defaultChecked
                                                    }
                                                    value={permission.id}
                                                />
                                            }
                                            label={permission.name}
                                        />
                                    )
                                })}
                            </Stack>
                            <Stack
                                alignItems="flex-start"
                                spacing="20px"
                                direction="row"
                            >
                                <Button
                                    className={'btn'}
                                    variant="outlined"
                                    onClick={onClose}
                                >
                                    Отмена
                                </Button>
                                <Button
                                    className={'btn'}
                                    variant="contained"
                                    type="submit"
                                >
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

export default EditModal
