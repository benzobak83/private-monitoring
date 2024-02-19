import { FC, ReactNode, useEffect, useState } from 'react'
import { WidgetLoading } from '@shared/ui/Loaders/WidgetLoading/WidgetLoading'
import { getCurrentWorkFx } from '../model/getCurrentWork'

type WorkWrapperProps = {
    children: ReactNode
}

export const WorkWrapper: FC<WorkWrapperProps> = ({ children }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentWorkFx().finally(() => setLoading(false))
    }, [])

    if (loading) return <WidgetLoading label="Загрузка смены..." />

    return <>{children}</>
}
