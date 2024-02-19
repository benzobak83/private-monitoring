import { useStore } from 'effector-react'
import { ReactNode, useEffect, useState } from 'react'
import { AdditionalAuthAsync } from '@pages/AdditionalAuth'
import { initUserFx } from '@/features/Auth/additionalAuth'
import { bitrixLoginFx } from '@/features/Auth/bitrixAuth'
import { $auth } from '@entities/Auth'
import { additionalTokenNotEmpty } from '@shared/api/helpers/additionalApiHelpers'
import { bitrixTokensNotEmpty } from '@shared/api/helpers/bitrixApiHelpers'
import { WidgetLoading } from '@shared/ui/Loaders/WidgetLoading/WidgetLoading'
import { SuspenseLoader } from '@shared/ui/suspenses/SuspenseLoader'

type AuthWrapperProps = {
    children: ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
    const auth = useStore($auth)

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (additionalTokenNotEmpty()) {
            initUserFx().finally(() => {
                return setLoading(false)
            })
        } else if (bitrixTokensNotEmpty()) {
            bitrixLoginFx().finally(() => {
                return setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [])

    if (loading) {
        return <WidgetLoading label="Авторизация..." />
    }

    if (!auth.isLogin) {
        return (
            <SuspenseLoader>
                <AdditionalAuthAsync />
            </SuspenseLoader>
        )
    }
    if (auth.isLogin) {
        return <>{children}</>
    }

    return <div></div>
}
