import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { $auth } from '@entities/Auth'

//**мидлвар из за тонкости работы битрикса с ссылками на определенный роут приложения */
export default function BitrixRedirecter() {
    const auth = useStore($auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.isLogin && window.location) {
            const placementOptions = new URLSearchParams(
                window.location.search
            )?.get('PLACEMENT_OPTIONS')

            const parsedQuery: any = placementOptions
                ? JSON.parse(placementOptions)
                : {}

            const parsedQueryUrl = parsedQuery.url
            const parsedQueryParams = parsedQuery.query

            if (parsedQueryUrl) {
                queueMicrotask(() => {
                    if (parsedQueryParams) {
                        navigate(parsedQueryUrl + parsedQueryParams)
                    } else {
                        navigate(parsedQueryUrl)
                    }
                })
            }
        }
    }, [auth, navigate])

    return null
}
