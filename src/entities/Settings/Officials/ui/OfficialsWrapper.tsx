import { FC, ReactNode, useEffect, useState } from 'react'
import { WidgetLoading } from '@shared/ui/Loaders/WidgetLoading/WidgetLoading'
import { getOfficialsTableDataFx, resetOfficialsTableData } from '../model/get'

type OfficialsWrapperProps = {
    children: ReactNode
}

export const OfficialsWrapper: FC<OfficialsWrapperProps> = ({ children }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getOfficialsTableDataFx().finally(() => {
            setLoading(false)
        })
        return () => {
            resetOfficialsTableData()
        }
    }, [])

    if (loading) return <WidgetLoading label="Загрузка должностных лиц..." />

    return <>{children}</>
}
