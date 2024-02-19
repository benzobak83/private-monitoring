import { useStore } from 'effector-react'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { $redirectToPrevPageIsEmited } from '@/features/General/redirectToPrevPage'
import { useInit } from '@shared/lib/hooks/useInit'

export const PermissionRedirecter: FC = () => {
    const redirectToPrevPageIsEmited = useStore($redirectToPrevPageIsEmited)

    const navigate = useNavigate()

    const { init } = useInit()

    useEffect(() => {
        if (init) return
        navigate(-1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [redirectToPrevPageIsEmited])

    return null
}
