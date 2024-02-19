import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import BitrixRedirecter from './BitrixRedirecter'
import { PermissionRedirecter } from './PermissionRedirecter'

export const Middlewares: FC = () => {
    return (
        <>
            <BitrixRedirecter />
            <PermissionRedirecter />
            <Outlet />
        </>
    )
}
