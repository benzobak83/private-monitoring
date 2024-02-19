import { useStore } from 'effector-react'
import { FC, ReactNode, useEffect, useState } from 'react'
import { ErrorPopup } from '@shared/ui/ErrorPopup/ErrorPopup'
import { WidgetLoading } from '@shared/ui/Loaders/WidgetLoading/WidgetLoading'
import { $dict, getDict } from '../model/get'

type DictWrapperProps = {
    children: ReactNode
}

export const DictWrapper: FC<DictWrapperProps> = ({ children }) => {
    const dict = useStore($dict)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getDict().finally(() => setLoading(false))
    }, [])

    if (loading) return <WidgetLoading label="Загрузка ресурсов..." />

    if (!Object.keys(dict).length) {
        return (
            <ErrorPopup
                title="Ошибка загрузки ресурсов"
                text="Не получены ресурсы для дальнейшей работы"
            />
        )
    }

    return <>{children}</>
}
