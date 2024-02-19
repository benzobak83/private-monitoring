//скопировал виджет с приложения "обращения граждан"

import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import { useStore } from 'effector-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AccessAccordion from './AccessAccordion'
import CreateModal from './CreateModal'
import EditModal from './EditModal'
import GrantModal from './GrantModal'
import { deleteRoleFx } from './store/deleteRole'
import { revokePermissionFx } from './store/EditPermission'
import {
    $permissionsStatus,
    $roleAccessError,
    $roles,
    getPermissionsFx,
    getRolesFx,
} from './store/Permissions'

//TODO!!! Продолжаю тянуть данный модуль со старых приложений без изменений, нужен рефакторинг как логический, так и архитектурный

export function PermissionsWidget() {
    const roles = useStore($roles)
    const permissionsStatus = useStore($permissionsStatus)
    const isRedirectToMain = useStore($roleAccessError)

    const [grantModal, setGrantModal] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<boolean>(false)
    const [createModal, setCreateModal] = useState<boolean>(false)
    const [roleId, setRoleId] = useState<number>(0)

    const navigate = useNavigate()

    const toggleGrantModal = () => setGrantModal(!grantModal)
    const toggleEditModal = () => setEditModal(!editModal)
    const toggleCreateModal = () => setCreateModal(!createModal)

    const handleGrant = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        roleId: number
    ) => {
        event.stopPropagation()

        setRoleId(roleId)
        toggleGrantModal()
    }

    const handleRevoke = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        roleId: number,
        userId: number
    ) => {
        event.stopPropagation()

        revokePermissionFx({ userId, roleId, type: 'revoke' })
    }

    const handlePermissionsEdit = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        roleId: number
    ) => {
        event.stopPropagation()
        setRoleId(roleId)
        toggleEditModal()
    }

    const onRoleDelete = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: number
    ) => {
        event.stopPropagation()
        deleteRoleFx(id)
    }

    useEffect(() => {
        getRolesFx()
        getPermissionsFx()
    }, [])

    useEffect(() => {
        if (permissionsStatus == 'shoudUpdate') {
            getRolesFx()
        }
    }, [permissionsStatus])

    useEffect(() => {
        if (isRedirectToMain) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRedirectToMain])

    return (
        <Stack marginTop="20px" spacing="16px" maxWidth="1000px">
            <Stack alignItems="flex-start">
                <Button
                    className={'btn'}
                    onClick={toggleCreateModal}
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Добавить роль
                </Button>
            </Stack>
            {roles?.map((role) => (
                <AccessAccordion
                    key={role.id}
                    onPermissionEdit={(event, id) =>
                        handlePermissionsEdit(event, id)
                    }
                    onRoleDelete={(event, id) => onRoleDelete(event, id)}
                    onHandleGrant={(event, id) => handleGrant(event, id)}
                    onHandleRevoke={(event, id, userId) =>
                        handleRevoke(event, id, userId)
                    }
                    role={role}
                />
            ))}
            {grantModal && (
                <GrantModal
                    role={roleId}
                    isOpen={grantModal}
                    onClose={toggleGrantModal}
                />
            )}
            {editModal && (
                <EditModal
                    isOpen={editModal}
                    onClose={toggleEditModal}
                    role={roleId}
                />
            )}
            {createModal && (
                <CreateModal isOpen={createModal} onClose={toggleCreateModal} />
            )}
        </Stack>
    )
}
